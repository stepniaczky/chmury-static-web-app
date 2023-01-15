import uuid
from datetime import datetime, timedelta
from dataclasses import dataclass, field

@dataclass
class Appointment:
    client_email: str
    barber_id: int
    barber_location_id: int
    barber_service_id: int
    custom_duration: int
    start_date: str or None
    _id: str = field(default_factory=lambda: str(uuid.uuid4()))
    is_cancelled: bool or None = field(default=False)
    end_date: str or None = field(default=None)
    
    def __post_init__(self):
        end_date = datetime.strptime(self.start_date, '%d/%m/%Y, %H:%M') + timedelta(minutes=self.custom_duration)
        self.end_date = end_date.strftime('%d/%m/%Y, %H:%M')
          