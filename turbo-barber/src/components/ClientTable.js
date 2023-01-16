import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteAppointmentButton } from './Buttons/DeleteAppointmentButton';
import { useSelector } from "react-redux";

const ClientTable = () => {
  //Apointment, Service, Location, Barber - GET
  const userEmail = useSelector((state) => state.auth.user);


  const [apointment, setApointment] = useState([]);
  const [service, setService] = useState([]);
  const [location, setLocation] = useState([]);
  const [barber, setBarber] = useState([]);

  useEffect(() => {
    //GET - Apointment
    axios
      .get("api/appointments")
      .then((res) => {
        setApointment(res.data);
      })
      .catch((err) => console.log(err));
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

  const UserEmail = userEmail;

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
