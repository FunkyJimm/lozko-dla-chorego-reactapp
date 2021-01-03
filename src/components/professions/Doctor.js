import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_KEY } from '../../apiKey';

const Doctor = props => {
    const { id } = props;

    const [doctorResponse, setDoctorResponse] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [edit, setEdit] = React.useState(false);

    const [doctorHospital, setDoctorHospital] = React.useState("");
    const [doctorSpecialization, setDoctorSpecialization] = React.useState("");

    useEffect(() => {
        const doctorQuery = {
            searchType: "doctorUserID",
            searchInput: id,
            apiKey: API_KEY
        }

        console.log(doctorQuery);

        axios.post('http://localhost:3000/doctors/find', doctorQuery)
            .then(response => {
                if (response.data._id) {
                    setDoctorResponse(response.data)
                } else {
                    setErrorMessage(response.data)
                }
            })
            .catch(error => {
                setErrorMessage("Błąd odczytu danych!");
            })
    }, [])

    const handleDoctorHospital = e => {
        setDoctorHospital(e.target.value);
    }

    const handleDoctorSpecialization = e => {
        setDoctorSpecialization(e.target.value);
    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleAddDoctor = () => {
        const doctorJSON = {
            doctorUserID: id,
            doctorHospital,
            doctorSpecialization,
            apiKey: API_KEY
        }

        axios.post('http://localhost:3000/doctors/add', doctorJSON)
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
            {errorMessage ? <button onClick={handleEdit}>Dodaj nowego lekarza</button> : null}

            {edit ?
                <table>
                    <tr>
                        <td>Szpital:</td>
                        <td>
                            <input type="text"
                                value={doctorHospital}
                                onChange={handleDoctorHospital} />
                        </td>
                    </tr>
                    <tr>
                        <td>Specjalizacja:</td>
                        <td>
                            <input type="text"
                                value={doctorSpecialization}
                                onChange={handleDoctorSpecialization} />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button onClick={handleAddDoctor}>Zatwierdź</button>
                        </td>
                    </tr>
                </table> : null}

            {doctorResponse ?
                <table>
                    <tr>
                        <td>Szpital:</td>
                        <td>{doctorResponse.doctorHospital}</td>
                    </tr>
                    <tr>
                        <td>Specjalizacja:</td>
                        <td>{doctorResponse.doctorSpecialization}</td>
                    </tr>
                </table> : null}
        </div>
    )
}

export default Doctor;