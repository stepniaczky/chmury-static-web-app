import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminTable = () => {
  //Service, Location, Barber - GET
  const [service, setService] = useState([]);
  const [location, setLocation] = useState([]);
  const [barber, setBarber] = useState([]);

  useEffect(() => {
    //GET - Service
    axios
      .get("https://turbo-barber-api.azurewebsites.net/barber_services")
      .then((res) => {
        console.log("Getting services data :::", res.data);
        setService(res.data);
      })
      .catch((err) => console.log(err));
    //GET - Location
    axios
      .get("https://turbo-barber-api.azurewebsites.net/barber_locations")
      .then((res) => {
        console.log("Getting locations data :::", res.data);
        setLocation(res.data);
      })
      .catch((err) => console.log(err));
    //GET - Barber
    axios
      .get("https://turbo-barber-api.azurewebsites.net/barbers")
      .then((res) => {
        console.log("Getting barbers data :::", res.data);
        setBarber(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    //Tabela z lokalizacjami
    <></>
    //Tabela z Barberami

    //Tabela z Uslugami
  );
};

export default AdminTable;
