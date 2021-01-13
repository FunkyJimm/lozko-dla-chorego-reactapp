import React, { useState } from 'react';
import axios from 'axios';

import { API_KEY } from '../../apiKey';

const DispatchersList = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [dispatchersResponse, setDispatchersResponse] = useState(null);

    const handleFind = () => {
        const findJSON = {
            searchType: "userProfession",
            searchInput: "dispatcher",
            searchFilter: 1,
            apiKey: API_KEY,
        }

        axios.post(`http://localhost:3000/users/find`, findJSON)
            .then(response => {
                if (response.data._id) {
                    setDispatchersResponse(response.data)
                } else {
                    setErrorMessage(response.data)
                }
            })
            .catch(error => {
                setErrorMessage(error.data)
            })
    }

    const handleDelete = (ambulanceRegistrationNumber) => {
        const deleteJSON = {
            dispatcherUserID,
            apiKey: API_KEY
        }

        axios.delete('http://localhost:3000/dispatchers/delete', { data: deleteJSON })
            .then(response => {
                console.log(response);
                setErrorMessage(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const dispatchersList = props.props.map(ambulance => (
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
            {dispatchersList}
            {errorMessage ? <p>{errorMessage}</p> : null}
        </>
    )
}

export default DispatchersList;