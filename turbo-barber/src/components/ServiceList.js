import { Accordion, ListGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import styles from "./List.module.css";
import axios from "axios";

const ServiceList = () => {
  //Service Get
  const [service,setService] = useState([])

  useEffect(() => {
    axios.get('api/barber_services')
    .then(res => {
      setService(res.data)
    }).catch(err => console.log(err))
  },[])

     return (<Accordion className="mt-5 border-neutral-800 focus:ring-neutral-800">
        <Accordion.Panel>
            <Accordion.Title>Włosy</Accordion.Title>
            <Accordion.Content>
                <Accordion className="border-neutral-800 ">
                    {service.filter(service => {return service.category === 'hair'}).map(service => {
                        return (
                                <Accordion.Panel>
                                    <Accordion.Title className="">{service.name}</Accordion.Title>
                                    <Accordion.Content className="text-white ">
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <div className={styles.ListGroup2Cells}>
                                                    <li>Cena: {service.price} zł</li>
                                                    <li>Czas: {service.custom_duration} min</li>
                                                </div>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <div className={styles.ListGroupDesc}>
                                                    <p>{service.description}</p>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Accordion.Content>
                                </Accordion.Panel>
                        )
                    })}
                </Accordion>
            </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
            <Accordion.Title>Broda</Accordion.Title>
            <Accordion.Content>
                <Accordion className="border-neutral-800">
                    {service.filter(service => {return service.category === 'beard'}).map(service => {
                        return (
                            <Accordion.Panel>
                            <Accordion.Title className="">{service.name}</Accordion.Title>
                            <Accordion.Content className="text-white ">
                                <ListGroup>
                                    <ListGroup.Item>
                                        <div className={styles.ListGroup2Cells}>
                                            <li>Cena: {service.price} zł</li>
                                            <li>Czas: {service.custom_duration} min</li>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className={styles.ListGroupDesc}>
                                            <p>{service.description}</p>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Content>
                        </Accordion.Panel>
                        )
                    })}
                </Accordion>
            </Accordion.Content>
        </Accordion.Panel>
    </Accordion>
     )
}

export default ServiceList;
