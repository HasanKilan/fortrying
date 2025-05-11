from fastapi import FastAPI
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel, SecuritySchemeType
from fastapi.openapi.models import OAuthFlowPassword
from fastapi.security import OAuth2
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from app.db.database import engine
from app.models import models
from app.api.v1.endpoints import auth, product, cart, seller
from app.api.v1.endpoints import address 
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from app.core.limiter import limiter
from apscheduler.schedulers.background import BackgroundScheduler
from app.jobs.token_cleanup import cleanup_expired_tokens_job


# Initialize FastAPI app with custom docs settings
app = FastAPI(
    title="TrendYol Backend",
    version="1.0.0",
    docs_url=None,
    redoc_url=None
)


app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please wait and try again."}
    )


# Mount routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(product.router, tags=["Products"])
app.include_router(cart.router, tags=["Cart"])
app.include_router(seller.router, tags=["Seller"])
app.include_router(address.router, tags=["Addresses"])  

# Custom OAuth2 security scheme for Swagger UI
class OAuth2PasswordRequestFormStrict(OAuth2):
    def __init__(self):
        flows = OAuthFlowsModel(
            password=OAuthFlowPassword(tokenUrl="/auth/token")
        )
        super().__init__(flows=flows)

oauth2_scheme = OAuth2PasswordRequestFormStrict()

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to TrendYol Backend with FastAPI!"}

# Custom Swagger UI (remembers token)
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title="TrendYol Swagger",
        swagger_ui_parameters={"persistAuthorization": True}
    )

# Custom OpenAPI schema generator
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="TrendYol Backend",
        version="1.0.0",
        description="API docs with token persistence in Swagger",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(cleanup_expired_tokens_job, "interval", hours=12)  # every 12h
    scheduler.start()

start_scheduler()