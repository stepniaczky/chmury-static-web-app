import uuid
from typing import List
from datetime import datetime, timedelta
from dataclasses import dataclass, field

@dataclass
class Barber:
    first_name: str
    last_name: str
    gender: str
    barber_services_id: List[str]
    barber_location_id: str
    _id: str = field(default_factory=lambda: str(uuid.uuid4()))
    