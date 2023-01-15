from fastapi import APIRouter, HTTPException, status, Body, Request

from core import settings
from db.config import get_collection
from models import Barber
from utils.schemas import BarberUpdate, BarberCreate
from routers import barber_locations, barber_services

router = APIRouter()


@router.get('/barbers', tags=['barbers'], summary='Get all barbers')
def get_barbers():
    barbers_collection = get_collection('barbers')
    barbers_cursor = barbers_collection.find()

    barbers = []
    for barber in barbers_cursor:
        barbers.append(Barber(**barber))

    return barbers


@router.get('/barbers/{id}', tags=['barbers'], summary='Get barber by id')
def get_barber(id):
    barbers_collection = get_collection('barbers')
    barber = barbers_collection.find_one({'_id': id})
    
    if barber:
        return barber

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber not found")


@router.post('/barbers', tags=['barbers'], summary='Create barber')
def create_barber(barber_create: BarberCreate = Body(...)):
    
    if barber_create.gender not in ['male', 'female']:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid gender")
    
    barber_locations_list = [barber_location._id for barber_location in barber_locations.get_barber_locations()]
    barber_services_list = [barber_service._id for barber_service in barber_services.get_barber_services()]

    if barber_create.barber_location_id not in barber_locations_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid barber location id")
    
    for service_id in barber_create.barber_services_id:
        if service_id not in barber_services_list:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Invalid barber service id")
    
    barber = Barber(**barber_create.__dict__)
    barbers_collection = get_collection('barbers')
    barbers_collection.insert_one(barber.__dict__)
    return barber

@router.delete('/barbers/{id}', tags=['barbers'], summary='Delete barber by id')
def delete_barber(id):
        
    barbers_collection = get_collection('barbers')
    if barbers_collection.find_one({'_id': id}):
        barbers_collection.delete_one({'_id': id})
        return id
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber not found")

@router.put('/barbers/{id}', tags=['barbers'], summary='Update barber by id')
def update_barber(id, req: BarberUpdate = Body(...)):
    if 'barber_services_id' in req.__dict__:
        barber_services_list = [barber_service._id for barber_service in barber_services.get_barber_services()]
        
        for service_id in req.barber_services_id:
            if service_id not in barber_services_list:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                    detail="Invalid barber service id")
            
    if 'barber_location_id' in req.__dict__:       
        barber_locations_list = [barber_location._id for barber_location in barber_locations.get_barber_locations()]

        if req.barber_location_id not in barber_locations_list:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Invalid barber location id")
        
    barbers_collection = get_collection('barbers')
    if barbers_collection.find_one({'_id': id}):
        barbers_collection.update_one({'_id': id}, {'$set': req.__dict__})
        return id
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber not found")
    