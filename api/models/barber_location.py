import uuid

from geopy.geocoders import Nominatim
from typing import List, Tuple
from datetime import datetime
from dataclasses import dataclass, field


@dataclass
class BarberLocation:
    city: str
    address: str
    address_name: str
    work_days: List[str]
    work_hours_start: str
    work_hours_end: str
    _id: str = field(default_factory=lambda: str(uuid.uuid4()))
    address_lat: float or None = field(default=None)
    address_lon: float or None = field(default=None)

    def __post_init__(self):
        if self.address_lat is None or self.address_lon is None:
            self.address_lat, self.address_lon = self.get_lat_lon()

    def get_lat_lon(self) -> Tuple[float, float]:
        loc = Nominatim(user_agent="GetLoc")
        getLoc = loc.geocode(f"{self.address}, {self.city}")
        return (getLoc.latitude, getLoc.longitude)

    def get_distance(self, lat: float, lon: float) -> float:
        return ((self.address_lat - lat)**2 + (self.address_lon - lon)**2)**0.5
