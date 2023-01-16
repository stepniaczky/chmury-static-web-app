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

  return (
    //Tabela z lokalizacjami
    <></>
    //Tabela z Barberami

    //Tabela z Uslugami
  );
};

export default AdminTable;
