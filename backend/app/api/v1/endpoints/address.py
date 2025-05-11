from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.dependencies import get_db, check_role
from app.models.models import Address, User, AddressAuditLog
from app.schemas.address import AddressCreate, AddressOut
from datetime import datetime

router = APIRouter()


@router.post("/addresses", response_model=AddressOut)
def create_address(
    address: AddressCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    # Ensure first address is default
    if address.is_default:
        db.query(Address).filter_by(user_id=current_user.id).update({"is_default": False})
    elif db.query(Address).filter_by(user_id=current_user.id).count() == 0:
        address.is_default = True

    # Save address
    new_address = Address(**address.dict(), user_id=current_user.id)
    db.add(new_address)
    db.commit()
    db.refresh(new_address)

    # Save audit log
    audit = AddressAuditLog(
        user_email=current_user.email,
        action="create",
        address_id=new_address.id,
        timestamp=datetime.utcnow(),
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent")
    )
    db.add(audit)
    db.commit()

    return new_address

@router.get("/addresses", response_model=list[AddressOut])
def list_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    return db.query(Address).filter_by(user_id=current_user.id).all()

@router.delete("/addresses/{address_id}", status_code=204)
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    address = db.query(Address).filter_by(id=address_id, user_id=current_user.id).first()
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")

    db.delete(address)
    db.commit()
    db.add(AddressAuditLog(user_email=current_user.email, action="delete", address_id=address_id, timestamp=datetime.utcnow()))
    db.commit()
    return

@router.put("/addresses/{id}", response_model=AddressCreate)
def update_address(
    id: int,
    updated_data: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    address = db.query(Address).filter_by(id=id, user_id=current_user.id).first()
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")

    if updated_data.is_default:
        db.query(Address).filter_by(user_id=current_user.id).update({"is_default": False})

    for key, value in updated_data.dict().items():
        setattr(address, key, value)

    db.commit()
    db.refresh(address)
    db.add(AddressAuditLog(user_email=current_user.email, action="update", address_id=id, timestamp=datetime.utcnow()))
    db.commit()
    return address

@router.post("/addresses/{id}/set-default", status_code=200)
def set_default_address(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    address = db.query(Address).filter_by(id=id, user_id=current_user.id).first()
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")

    db.query(Address).filter_by(user_id=current_user.id).update({Address.is_default: False})
    address.is_default = True
    db.commit()

    db.add(AddressAuditLog(user_email=current_user.email, action="set_default", address_id=id, timestamp=datetime.utcnow()))
    db.commit()
    return {"message": "Default address updated"}

@router.get("/addresses/{id}", response_model=AddressOut)
def get_address_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role(["user"], use_http=False))
):
    address = db.query(Address).filter_by(id=id, user_id=current_user.id).first()
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address
