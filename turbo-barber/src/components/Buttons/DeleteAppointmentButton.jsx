import React from "react";
import axios from "axios";
import styles from "./Buttons.module.css";

export const DeleteAppointmentButton = (props) => {

    const handleDelete = async (id) => {
        try {
            axios.put(`api/appointments/${id}`, {
                "is_cancelled": true
            });
        } catch (error) {

        }
        window.location.reload(false);
    };

    return (
        <button className={styles.CancellButton} onClick={() => handleDelete(props.appointmentId)}>Anuluj wizytę</button>
    )
}