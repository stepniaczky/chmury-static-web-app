import { Accordion, ListGroup } from "flowbite-react";
import styles from "./List.module.css";
import { useEffect, useState } from "react";
import axios from "axios";


const LocationList = () => {

    const polishDaysOfWeek = {
        Monday: "Poniedziałek",
        Tuesday: "Wtorek",
        Wednesday: "Środa",
        Thursday: "Czwartek",
        Friday: "Piątek",
        Saturday: "Sobota",
        Sunday: "Niedziela"
    }

    const [location, setLocation] = useState([]);

    useEffect(() => {
        //GET - Location
        axios
            .get("https://turbo-barber-api.azurewebsites.net/barber_locations")
            .then((res) => {
                console.log("Getting locations data :::", res.data);
                setLocation(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const removeDuplicates = (arr, prop) => {
        const obj = {};
        return Object.keys(
            arr.reduce((prev, next) => {
                if (!obj[next[prop]]) obj[next[prop]] = next;
                return obj;
            }, obj)
        ).map((i) => obj[i]);
    };

    return (
    <Accordion className="mt-5 border-neutral-800">
        {removeDuplicates(location, "city").map(({city}) => (
            <Accordion.Panel>
                <Accordion.Title>{city}</Accordion.Title>
                <Accordion.Content>
                <Accordion className="border-neutral-800 ">
                {removeDuplicates(location, "address_name").filter(l => l.city === city).map(l => {
                        return (
                                <Accordion.Panel>
                                    <Accordion.Title className="">{l.address_name}</Accordion.Title>
                                    <Accordion.Content className="text-white ">
                                    {location.filter(loc => loc.address_name === l.address_name).map(el =>
                                        <ListGroup className={styles.ListGroup}>
                                            <ListGroup.Item>
                                                Ulica: {el.address}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Dni robocze: {el.work_days.map((day) => `${polishDaysOfWeek[day]}`).join(', ')}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Godziny otwarcia: {el.work_hours_start} - {el.work_hours_end}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    )}
                                    </Accordion.Content>
                                </Accordion.Panel>
                        )
                    })}
                </Accordion>
                </Accordion.Content>
            </Accordion.Panel>
          ))}
    </Accordion>
);
};

export default LocationList;
