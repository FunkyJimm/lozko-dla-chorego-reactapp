import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_KEY } from '../../apiKey';

const Paramedic = props => {
    const { id } = props;

    const [paramedicResponse, setParamedicResponse] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [edit, setEdit] = React.useState(false);

    const [paramedicAmbulance, setParamedicAmbulance] = React.useState("");
    const [paramedicRescueTeam, setParamedicRescueTeam] = React.useState("");

    useEffect(() => {
        const paramedicQuery = {
            searchType: "paramedicUserID",
            searchInput: id,
            apiKey: API_KEY
        }

        console.log(paramedicQuery);

        axios.post('http://localhost:3000/paramedics/find', paramedicQuery)
            .then(response => {
                if (response.data._id) {
                    setParamedicResponse(response.data)
                } else {
                    setErrorMessage(response.data)
                }
            })
            .catch(error => {
                setErrorMessage("Błąd odczytu danych!");
            })
    }, [])

    const handleParamedicAmbulance = e => {
        setParamedicAmbulance(e.target.value);
    }

    const handleParamedicRescueTeam = e => {
        setParamedicRescueTeam(e.target.value);
    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleAddParamedic = () => {
        const paramedicJSON = {
            paramedicUserID: id,
            paramedicAmbulance,
            paramedicRescueTeam,
            apiKey: API_KEY
        }

        axios.post('http://localhost:3000/paramedics/add', paramedicJSON)
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
            {errorMessage ? <button onClick={handleEdit}>Dodaj nowego ratownika</button> : null}

            {edit ?
                <table>
                    <tr>
                        <td>Nr rejestracyjny ambulansu:</td>
                        <td>
                            <input type="text"
                                value={paramedicAmbulance}
                                onChange={handleParamedicAmbulance} />
                        </td>
                    </tr>
                    <tr>
                        <td>Nr załogi:</td>
                        <td>
                            <input type="text"
                                value={paramedicRescueTeam}
                                onChange={handleParamedicRescueTeam} />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button onClick={handleAddParamedic}>Zatwierdź</button>
                        </td>
                    </tr>
                </table> : null}

            {paramedicResponse ?
                <table>
                    <tr>
                        <td>Nr rejestracyjny ambulansu:</td>
                        <td>{paramedicResponse.paramedicAmbulance}</td>
                    </tr>
                    <tr>
                        <td>Nr załogi:</td>
                        <td>{paramedicResponse.paramedicRescueTeam}</td>
                    </tr>
                </table> : null}
        </div>
    )
}

export default Paramedic;