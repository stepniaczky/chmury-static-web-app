import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteAppointmentButton } from './Buttons/DeleteAppointmentButton';
import {useMsal} from '@azure/msal-react';

const ClientTable = () => {
  //Apointment, Service, Location, Barber - GET
  const {accounts} = useMsal();


  const [apointment, setApointment] = useState([]);
  const [service, setService] = useState([]);
  const [location, setLocation] = useState([]);
  const [barber, setBarber] = useState([]);

  useEffect(() => {
    //GET - Apointment
    axios
      .get("https://turbo-barber-api.azurewebsites.net/appointments")
      .then((res) => {
        console.log("Getting apointments data :::", res.data);
        setApointment(res.data);
      })
      .catch((err) => console.log(err));
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

  //Tu trzeba ściągąć mail usera zalogowanego
  // const UserEmail = "user@gmail.com";
  const UserEmail = accounts[0].username;

  //Przefiltrowane rezerwacje danego uzytkownika
  const filteredApointments = apointment.filter((apointment) => {
    return apointment.client_email === UserEmail;
  });

  return (
    <Table className="mt-3">
      <Table.Head>
        <Table.HeadCell>Lokalizacja</Table.HeadCell>
        <Table.HeadCell>Barber</Table.HeadCell>
        <Table.HeadCell>Usługa</Table.HeadCell>
        <Table.HeadCell>Data</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {filteredApointments.map((filteredApointments) => {
          return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {location
                .filter((location) => {
                  return (
                    location._id === filteredApointments.barber_location_id
                  );
                })
                .map((location) => {
                  return (
                    <Table.Cell>
                      {location.city}, {location.address}
                    </Table.Cell>
                  );
                })}
              {barber
                .filter((barber) => {
                  return barber._id === filteredApointments.barber_id;
                })
                .map((barber) => {
                  return (
                    <Table.Cell>
                      {`${barber.first_name} ${barber.last_name}`}
                    </Table.Cell>
                  );
                })}
              {service
                .filter((service) => {
                  return service._id === filteredApointments.barber_service_id;
                })
                .map((service) => {
                  return <Table.Cell>{`${service.name}`}</Table.Cell>;
                })}
              <Table.Cell>{filteredApointments.start_date}</Table.Cell>
              {!filteredApointments.is_cancelled ? (
              <Table.Cell>
                  <DeleteAppointmentButton appointmentId={filteredApointments._id} />
              </Table.Cell>
              ) : (
                <Table.Cell>
                  <p className="dark:text-gray">Anulowano</p>
              </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ClientTable;
