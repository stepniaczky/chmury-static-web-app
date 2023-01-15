from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Body

from core import settings
from db.config import get_collection
from models import BarberLocation
from utils.schemas import BarberLocationUpdate, BarberLocationCreate

router = APIRouter()

def isTimeFormat(input):
    try:
        t = datetime.strptime(input, '%H:%M')
        return True
    except ValueError:
        return False

@router.get('/barber_locations', tags=['barber_locations'], summary='Get all barber locations')
def get_barber_locations():
    barber_locations_collection = get_collection('barber_locations')
    barber_locations_cursor = barber_locations_collection.find()

    barber_locations = []
    for barber_location in barber_locations_cursor:
        barber_locations.append(BarberLocation(**barber_location))

    return barber_locations


@router.get('/barber_locations/{id}', tags=['barber_locations'], summary='Get barber location by id')
def get_barber_location(id):
    barber_locations_collection = get_collection('barber_locations')
    barber_location = barber_locations_collection.find_one({'_id': id})
    
    if barber_location:
        return barber_location

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber location not found")


@router.post('/barber_locations', tags=['barber_locations'], summary='Create barber location')
def create_barber_location(barber_location_create: BarberLocationCreate = Body(...)):
    
    if not isTimeFormat(barber_location_create.work_hours_start) or not isTimeFormat(barber_location_create.work_hours_end):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid time format")
        
    for day in barber_location_create.work_days:
        if day not in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Invalid work days")
        
    barber_locations_collection = get_collection('barber_locations')
    barber_location = BarberLocation(**barber_location_create.__dict__)
    barber_locations_collection.insert_one(barber_location.__dict__)
    return barber_location


@router.delete('/barber_locations/{id}', tags=['barber_locations'], summary='Delete barber location by id')
def delete_barber_location(id):
        
    barber_locations_collection = get_collection('barber_locations')
    if barber_locations_collection.find_one({'_id': id}):
        barber_locations_collection.delete_one({'_id': id})
        return id
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber location not found")
    
    
@router.put('/barber_locations/{id}', tags=['barber_locations'], summary='Update barber location by id')
def update_barber_location(id, req: BarberLocationUpdate = Body(...)):
    
    if 'work_hours_start' in req.__dict__:
        if not isTimeFormat(req.work_hours_start):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Invalid start time format")
    
    if 'work_hours_end' in req.__dict__:
        if not isTimeFormat(req.work_hours_end):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Invalid end time format")
            
    if 'work_days' in req.__dict__:
        for day in req.work_days:
            if day not in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                    detail="Invalid work days")
        
    barber_locations_collection = get_collection('barber_locations')
    if barber_locations_collection.find_one({'_id': id}):
        barber_locations_collection.update_one({'_id': id}, {'$set': req.__dict__})
        return id
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Barber location not found")
