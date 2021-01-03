import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_KEY } from '../../apiKey';

const Dispatcher = props => {
    const { id } = props;

    const [dispatcherResponse, setDispatcherResponse] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [edit, setEdit] = React.useState(false);

    const [dispatcherHospital, setDispatcherHospital] = React.useState("");

    useEffect(() => {
        const dispatcherQuery = {
            searchType: "dispatcherUserID",
            searchInput: id,
            apiKey: API_KEY
        }

        axios.post('http://localhost:3000/dispatchers/find', dispatcherQuery)
            .then(response => {
                if (response.data._id) {
                    setDispatcherResponse(response.data)
                } else {
                    setErrorMessage(response.data)
                }
            })
            .catch(error => {
                setErrorMessage("Błąd odczytu danych!");
            })
    }, [])

    const handleDispatcherHospital = e => {
        setDispatcherHospital(e.target.value);
    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleAddDispatcher = () => {
        const dispatcherJSON = {
            dispatcherUserID: id,
            dispatcherHospital,
            apiKey: API_KEY
        }

        axios.post('http://localhost:3000/dispatchers/add', dispatcherJSON)
            .then(response => {
                setErrorMessage(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {errorMessage ? <p>{errorMessage}</p> : ""}
            {errorMessage ? <button onClick={handleEdit}>Dodaj nowego dyspozytora</button> : null}

            {edit ?
                <table>
                    <tr>
                        <td>Szpital:</td>
                        <td>
                            <input type="text"
                                value={dispatcherHospital}
                                onChange={handleDispatcherHospital} />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button onClick={handleAddDispatcher}>Zatwierdź</button>
                        </td>
                    </tr>
                </table> : null}

            {dispatcherResponse ?
                <table>
                    <tr>
                        <td>Szpital:</td>
                        <td>{dispatcherResponse.dispatcherHospital}</td>
                    </tr>
                </table> : null}
        </div>
    )
}

export default Dispatcher;