from pydantic import BaseModel, Field, EmailStr
from typing import List

class AppointmentCreate(BaseModel):
    client_email: EmailStr = Field(..., format='email', description="user email")
    barber_id: str
    barber_location_id: str
    barber_service_id: str
    custom_duration: int = Field(..., gt=1, description="barber service custom duration")
    start_date: str
    
class AppointmentUpdate(BaseModel):
    is_cancelled: bool

class BarberLocationCreate(BaseModel):
    city: str= Field(..., min_length=1, description="city")
    address: str= Field(..., min_length=1, description="city district")
    address_name: str= Field(..., min_length=1, description="barber location street")
    work_days: List[str]
    work_hours_start: str
    work_hours_end: str
    
class BarberLocationUpdate(BaseModel):
    work_days: List[str] = None
    work_hours_start: str = None
    work_hours_end: str = None
    

class BarberServiceCreate(BaseModel):
    name: str = Field(..., min_length=1, description="name")
    category: str
    description: str = ""
    price: float = Field(..., gt=0.01, description="product price")
    custom_duration: int = Field(..., gt=1, description="barber service custom duration")
    
class BarberServiceUpdate(BaseModel):
    name: str = Field(..., min_length=1, description="name") or None
    description: str = ""
    price: float = Field(..., gt=0.01, description="product price") or None
    custom_duration: int = Field(..., gt=1, description="barber service custom duration") or None
    

class BarberCreate(BaseModel):
    first_name: str = Field(..., min_length=1, description="first_name")
    last_name: str = Field(..., min_length=1, description="last_name")
    gender: str = Field(..., min_length=1, description="gender")
    barber_services_id: List[str]
    barber_location_id: str
    
class BarberUpdate(BaseModel):
    barber_services_id: List[str] = None
    barber_location_id: str = None