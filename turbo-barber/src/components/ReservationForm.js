import { Label, Select, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import { useSelector } from "react-redux";

const ReservationForm = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);

  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedBarberId, setSelectedBarberId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [filteredBarbers, setFilteredBarbers] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow((lat2 - lat1), 2) + Math.pow((lon2 - lon1), 2));
  }

  const handleFindNearest = () => {
    const userLat = userLocation.latitude;
    const userLon = userLocation.longitude;

    let nearestLocation = location[0];
    let nearestDistance = getDistance(userLat, userLon, nearestLocation.address_lat, nearestLocation.address_lon);

    location.forEach((loc) => {
      const distance = getDistance(userLat, userLon, loc.address_lat, loc.address_lon);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLocation = loc;
      }
    });

    setSelectedLocationId(nearestLocation._id);
  };


  const handleLocationChange = ({ target }) => {
    if (target.value === "Select location") {setSelectedLocationId(null); return;}
    setSelectedLocationId(target.value);
  };

  const handleBarberChange = ({ target }) => {
    if (target.value === "Select barber") {setSelectedBarberId(null); return;}
    setSelectedBarberId(target.value);
  };

  const handleServiceChange = ({ target }) => {
    if (target.value === "Select service") {setSelectedServiceId(null); return;}
    setSelectedServiceId(target.value);
  };

  const handleDateChange = ({ target }) => {
    const date = new Date(target.value);

    if (!isWorkDay(date.toLocaleString("en-us", { weekday: "long" }))) {
      NotificationManager.warning(
        "W wybranym dniu tygodnia lokalizacja nie pracuje. Wybierz inny dzień!"
      );
      setSelectedDate(null);
      return;
    }

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    setSelectedDate(
      `${day}/${month}/${year}`
    );
  };

  const handleTimeChange = ({ target }) => {
    setSelectedTime(target.value);
  };

  const isWorkDay = (dayOfWeek) => {
    const work_days = location.filter(
      ({ _id }) => _id === selectedLocationId
    )[0].work_days;
    return work_days.includes(dayOfWeek);
  };

  //Service, Location, Barber - GET
  const [service, setService] = useState([]);
  const [location, setLocation] = useState([]);
  const [barber, setBarber] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setUserLocation(position.coords);
    });
  });

  useEffect(() => {
    //GET - Service
    axios
      .get("api/barber_services")
      .then((res) => {
        setService(res.data);
      })
      .catch((err) => console.log(err));
    //GET - Location
    axios
      .get("api/barber_locations")
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => console.log(err));
    //GET - Barber
    axios
      .get("api/barbers")
      .then((res) => {
        setBarber(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {

    if (!selectedLocationId) setFilteredBarbers([]);
    if (!selectedBarberId) setFilteredServices([]);

    const newFilteredBarbers = barber.filter(
      ({ barber_location_id }) => barber_location_id === selectedLocationId
    );
    setFilteredBarbers(newFilteredBarbers);

    if (selectedBarberId) {
      const newFilteredServices = service.filter(({ _id }) =>
        barber
          .filter((b) => b._id === selectedBarberId)[0]
          .barber_services_id.includes(_id)
      );
      setFilteredServices(newFilteredServices);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocationId, selectedBarberId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocationId === null) {
      NotificationManager.error("Wybierz lokalizację!");
      return;
    }
    if (selectedBarberId === null) {
      NotificationManager.error("Wybierz Barbera!");
      return;
    }
    if (selectedServiceId === null) {
      NotificationManager.error("Wybierz usługę!");
      return;
    }
    if (selectedDate === null) {
      NotificationManager.error("Wybrano złą datę!");
      return;
    }
    if (selectedTime === null) {
      NotificationManager.error("Wybierz czas!");
      return;
    }

    const newAppointment = {
      'client_email': isAuthenticated,
      'barber_id': selectedBarberId,
      'barber_location_id': selectedLocationId,
      'barber_service_id': selectedServiceId,
      'custom_duration': service.filter(({ _id }) => _id === selectedServiceId)[0].custom_duration,
      'start_date': `${selectedDate}, ${selectedTime}`,
    };


    axios.post(
      "api/appointments",
      newAppointment
    ).then((res) => {
      NotificationManager.success("Rezerwacja została złożona!");
    }).catch((err) => {
      NotificationManager.error("Wystąpił błąd. Spróbuj ponownie!");
    }
    );

    e.target.reset();
    setSelectedLocationId(null);
    setSelectedBarberId(null);
    setSelectedServiceId(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  return (
    <form
      id="reservationForm"
      className="max-w-lg mt-5 grid relative m-auto border border-neutral-800 rounded-lg bg-stone-900"
      onSubmit={handleSubmit}
    >
      <div className="my-1 mx-1 h-auto w-auto block justify-self-center	">
        <Label
          htmlFor="services"
          value="Formularz rezerwacji"
          className="text-white text-lg"
        />
      </div>
      <div id="selectLocation" className="my-1 mx-3">
        <div className="mb-2 block">
          <Label
            htmlFor="locations"
            value="Lokalizacja"
            className="text-white"
          />
        </div>
        <div className="w-full flex flex-row justify-between">
        <Select style={{minWidth: "16.5rem"}} id="locations" value={selectedLocationId} required={true} onChange={handleLocationChange}>
          <option selected>Select location</option>
          {location.map(({ _id, city, address }) => (
            <option key={_id} value={_id}>
              {city}, {address}
            </option>
          ))}
        </Select>
        <Button class="text-white bg-stone-600 rounded-lg px-5" onClick={handleFindNearest}>ZNAJDŹ NAJBLIŻSZĄ</Button>
        </div>
      </div>
      <div id="selectBarber" className="my-1 mx-3">
        <div className="mb-2 block">
          <Label htmlFor="barbers" value="Barber" className="text-white" />
        </div>
        <Select id="barbers" required={true} onChange={handleBarberChange}>
          <option selected>Select barber</option>
          {filteredBarbers.map(({ _id, first_name, last_name }) => (
            <option key={_id} value={_id}>
              {`${first_name} ${last_name}`}
            </option>
          ))}
        </Select>
      </div>
      <div id="selectService" className="my-1 mx-3">
        <div className="mb-2 block">
          <Label htmlFor="services" value="Usługa" className="text-white" />
        </div>
        <Select id="services" required={true} onChange={handleServiceChange}>
          <option selected>Select service</option>
          {filteredServices.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </Select>
      </div>

      {selectedLocationId && selectedBarberId && selectedServiceId ? (
        <div id="selectDate" className="my-1 mx-3">
          <div className="mb-2 block">
            <Label
              htmlFor="date"
              value="Data i godzina"
              className="text-white "
            />
          </div>
          <input
            id="date"
            required={true}
            type="date"
            placeholder="dd/mm/yyyy"
            min={new Date().toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
          <input
            id="time"
            required={true}
            type="time"
            min={
              location.filter((l) => l._id === selectedLocationId)[0]
                .work_hours_start
            }
            max={
              location.filter((l) => l._id === selectedLocationId)[0]
                .work_hours_end
            }
            onChange={handleTimeChange}
          />
        </div>
      ) : null}
      {isAuthenticated !== undefined ? (
        <Button
          type="submit"
          class="text-white bg-stone-600 border border-transparent hover:bg-stone-400 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg my-2 mx-3"
        >
          Rezerwuj
        </Button>
      ) : (
        <Button
          disabled
          title="Aby zarezerwować usługę musisz się zalogować"
          class="text-white bg-stone-600 border border-transparent group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg my-2 mx-3"
        >
          Zaloguj się przed dokonaniem rezerwacji
        </Button>
      )}
      <NotificationContainer />
    </form>
  );
};

export default ReservationForm;
