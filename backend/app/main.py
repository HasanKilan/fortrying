from fastapi import FastAPI
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel, SecuritySchemeType
from fastapi.openapi.models import OAuthFlowPassword
from fastapi.security import OAuth2
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from app.db.database import engine
from app.models import models
from app.api.v1.endpoints import auth, product

# Custom OAuth2 security scheme for Swagger UI
class OAuth2PasswordRequestFormStrict(OAuth2):
    def __init__(self):
        flows = OAuthFlowsModel(
            password=OAuthFlowPassword(tokenUrl="/auth/token")
        )
        super().__init__(flows=flows)

oauth2_scheme = OAuth2PasswordRequestFormStrict()

# ✅ Override default Swagger docs with persistent token memory
app = FastAPI(
    title="TrendYol Backend",
    version="1.0.0",
    docs_url=None,  # Disable default Swagger UI
    redoc_url=None
)

models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(product.router, tags=["Products"])

@app.get("/")
async def root():
    return {"message": "Welcome to TrendYol Backend with FastAPI!"}


# ✅ Custom Swagger UI (remembers token)
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title="TrendYol Swagger",
        swagger_ui_parameters={
            "persistAuthorization": True  # 💾 Remember tokens
        }
    )

# ✅ Optional custom OpenAPI config (optional but clean)
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
