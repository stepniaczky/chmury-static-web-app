import azure.functions as func

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from core import settings
from routers import appointments, barber_locations, barber_services, barbers
from db import config

app = FastAPI(
    title=settings.PROJECT_NAME,
    license_info={
        "name": "MIT License",
        "url": "https://www.mit.edu/~amini/LICENSE.md",
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    config.config()

app.include_router(appointments.router, tags=['appointments'])
app.include_router(barber_locations.router, tags=['barber_locations'])
app.include_router(barber_services.router, tags=['barber_services'])
app.include_router(barbers.router, tags=['barbers'])


def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
    return func.AsgiMiddleware(app).handle(req, context)
