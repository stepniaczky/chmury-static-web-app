import uuid
from dataclasses import dataclass, field

@dataclass
class BarberService:
    name: str
    category: str
    description: str
    price: float
    custom_duration: int
    _id: str = field(default_factory=lambda: str(uuid.uuid4()))
