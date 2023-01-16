from datetime import datetime

from fastapi import APIRouter, HTTPException, status, Body

from core import settings
from db.config import get_collection
from models import Appointment
from utils.schemas import AppointmentUpdate, AppointmentCreate
from routers import barbers, barber_locations, barber_services

router = APIRouter()


def isTimeFormat(input):
    try:
        t = datetime.strptime(input, '%d/%m/%Y, %H:%M')
        if t < datetime.now():
            return False
        return True
    except ValueError:
        return False


@router.get('/appointments', tags=['appointments'], summary='Get all appointments')
def get_appointments():
    appointments_collection = get_collection('appointments')
    appointments_cursor = appointments_collection.find()

    appointments = []
    for appointment in appointments_cursor:
        appointments.append(Appointment(**appointment))

    return appointments


@router.get('/appointments/{id}', tags=['appointments'], summary='Get appointment by id')
def get_appointment(id):
    appointments_collection = get_collection('appointments')
    appointment = appointments_collection.find_one({'_id': id})

    if appointment:
        return appointment

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Appointment not found")


@router.post('/appointments', tags=['appointments'], summary='Create appointment')
def create_appointment(appointment_create: AppointmentCreate = Body(...)):
    if isTimeFormat(appointment_create.start_date) == False:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid start date format")

    barbers_list = [barber._id for barber in barbers.get_barbers()]
    barber_locations_list = [
        barber_location._id for barber_location in barber_locations.get_barber_locations()]
    barber_services_list = [
        barber_service._id for barber_service in barber_services.get_barber_services()]

    if appointment_create.barber_location_id not in barber_locations_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid barber location id")

    if appointment_create.barber_service_id not in barber_services_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid barber service id")

    if appointment_create.barber_id not in barbers_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid barber id")

    custom_duration = barber_services.get_barber_service(
        appointment_create.barber_service_id)['custom_duration']

    if appointment_create.custom_duration != custom_duration:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid duration")

    appointments_collection = get_collection('appointments')
    appointment = Appointment(**appointment_create.__dict__)
    appointments_collection.insert_one(appointment.__dict__)
    return appointment


@router.put('/appointments/{id}', tags=['appointments'], summary='Update appointment by id')
def update_appointment(id: str, req: AppointmentUpdate = Body(...)):
    appointments_collection = get_collection('appointments')
    if appointments_collection.find_one({'_id': id}):
        appointments_collection.update_one({'_id': id}, {'$set': req.__dict__})
        return id

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Appointment not found")


@router.delete('/appointments/{id}', tags=['appointments'], summary='Delete appointment by id')
def delete_appointment(id: str):

    appointments_collection = get_collection('appointments')
    if appointments_collection.find_one({'_id': id}):
        appointments_collection.delete_one({'_id': id})
        return id

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Appointment not found")
