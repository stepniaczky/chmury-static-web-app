from fastapi import APIRouter, HTTPException, status, Body, Request

from core import settings
from db.config import get_collection
from models import BarberService
from utils.schemas import BarberServiceUpdate, BarberServiceCreate

router = APIRouter()

@router.get('/barber_services', tags=['barber_services'], summary='Get all barber services')
def get_barber_services():
    barber_services_collection = get_collection('barber_services')
    barber_services_cursor = barber_services_collection.find()

    barber_services = []
    for barber_service in barber_services_cursor:
        barber_services.append(BarberService(**barber_service))

    return barber_services


@router.get('/barber_services/{id}', tags=['barber_services'], summary='Get barber service by id')
def get_barber_service(id):
    barber_services_collection = get_collection('barber_services')
    barber_service = barber_services_collection.find_one({'_id': id})
    
    if barber_service:
        return barber_service

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber service not found")


@router.post('/barber_services', tags=['barber_services'], summary='Create barber service')
def create_barber_service(barber_service: BarberServiceCreate = Body(...)):
        
    barber_services_collection = get_collection('barber_services')
    barber_services_collection.insert_one(barber_service.__dict__)
    return barber_service

@router.delete('/barber_services/{id}', tags=['barber_services'], summary='Delete barber service by id')
def delete_barber_service(id):
        
    barber_services_collection = get_collection('barber_services')
    if barber_services_collection.find_one({'_id': id}):
        barber_services_collection.delete_one({'_id': id})
        return id
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber service not found")

@router.put('/barber_services/{id}', tags=['barber_services'], summary='Update barber service by id')
def update_barber_service(id, req: BarberServiceUpdate = Body(...)):
        
    barber_services_collection = get_collection('barber_services')
    if barber_services_collection.find_one({'_id': id}):
        barber_services_collection.update_one({'_id': id}, {'$set': req.__dict__})
        return id
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber service not found")