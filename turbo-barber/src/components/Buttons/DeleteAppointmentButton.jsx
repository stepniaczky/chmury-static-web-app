import React from "react";
import axios from "axios";
import styles from "./Buttons.module.css";

export const DeleteAppointmentButton = (props) => {

    const handleDelete = async (id) => {
        try {
            axios.put(`https://turbo-barber-api.azurewebsites.net/appointments/${id}`, {
                "is_cancelled": true
            });
        } catch (error) {

        }
    };

    return (
        <button className={styles.CancellButton} onClick={() => handleDelete(props.appointmentId)}>Anuluj wizytę</button>
    )
}