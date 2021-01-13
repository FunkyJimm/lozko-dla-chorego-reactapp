import React, { useState } from 'react';
import axios from 'axios';

import { API_KEY } from '../../apiKey';

const AmbulancesList = (props) => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleDelete = (ambulanceRegistrationNumber) => {
        const deleteJSON = {
            ambulanceRegistrationNumber,
            apiKey: API_KEY
        }

        axios.delete('http://localhost:3000/ambulances/delete', { data: deleteJSON })
            .then(response => {
                console.log(response);
                setErrorMessage(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const ambulancesList = props.props.map(ambulance => (
        <table key={ambulance._id}>
            <tbody>
                <tr>
                    <td>Nr rejestracyjny:</td>
                    <td>{ambulance.ambulanceRegistrationNumber}</td>
                </tr>
                <tr>
                    <td>Typ ambulansu:</td>
                    <td>{ambulance.ambulanceType}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button onClick={() => handleDelete(ambulance.ambulanceRegistrationNumber)}>Usuń</button>
                    </td>
                </tr>
            </tbody>
        </table>
    ))

    return (
        <>
            {ambulancesList}
            {errorMessage ? <p>{errorMessage}</p> : null}
        </>
    )
}

export default AmbulancesList;