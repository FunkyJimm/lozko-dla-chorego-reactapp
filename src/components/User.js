import React, { useState } from 'react';
import axios from 'axios';

import { API_KEY } from '../apiKey';

import Dispatcher from './professions/Dispatcher';
import Doctor from './professions/Doctor';
import Paramedic from './professions/Paramedic';

const User = props => {
    let professionText = "";
    let permissionText = "";

    const { _id, userLogin, userName, userSurname, userAddress, userCity, userPostalCode,
        userPhoneNumber, userEmailAddress, userProfession, userPermission } = props.props;

    if (userProfession === 'dispatcher') {
        professionText = "Dyspozytor";
    } else if (userProfession === 'doctor') {
        professionText = "Lekarz";
    } else if (userProfession === 'paramedic') {
        professionText = "Ratownik";
    } else {
        professionText = "Nie określono";
    }

    if (userPermission === 1) {
        permissionText = "Administrator"
    } else if (userPermission === 2) {
        permissionText = "Użytkownik"
    } else if (userPermission === 3) {
        permissionText = "Brak"
    }

    const [edit, setEdit] = React.useState(false);

    const [profession, setProfession] = React.useState(professionText);
    const [permission, setPermission] = React.useState(permissionText);

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const handleApply = (valueName, valueUpdate) => {
        const updateJSON = {
            userName,
            valueName,
            valueUpdate,
            apiKey: API_KEY
        }

        axios.put('http://localhost:3000/users/update', updateJSON)
            .then(response => {
                console.log(response);
                this.setState({
                    errorMessage: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleProfession = e => {
        setProfession(e.target.value);
    }

    const handlePermission = e => {
        setPermission(parseInt(e.target.value));
    }

    return (
        <div>
            <p>Użytkownik</p>
            <table>
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{_id}</td>
                    </tr>
                    <tr>
                        <td>Login:</td>
                        <td>{userLogin}</td>
                    </tr>
                    <tr>
                        <td>Imię:</td>
                        <td>{userName}</td>
                    </tr>
                    <tr>
                        <td>Nazwisko:</td>
                        <td>{userSurname}</td>
                    </tr>
                    <tr>
                        <td>Adres:</td>
                        <td>{userAddress}</td>
                    </tr>
                    <tr>
                        <td>Miasto:</td>
                        <td>{userCity}</td>
                    </tr>
                    <tr>
                        <td>Kod pocztowy:</td>
                        <td>{userPostalCode}</td>
                    </tr>
                    <tr>
                        <td>Nr telefonu:</td>
                        <td>{userPhoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Adres e-mail:</td>
                        <td>{userEmailAddress}</td>
                    </tr>
                    <tr>
                        <td>Zawód:</td>
                        <td>
                            {edit ?
                                <select name="userProfession"
                                    onChange={handleProfession}>
                                    <option value="dispatcher">Dyspozytor</option>
                                    <option value="doctor">Lekarz</option>
                                    <option value="paramedic">Ratownik</option>
                                </select> :
                                professionText}
                        </td>
                        {edit ? <button name="userProfession" onClick={() => handleApply("userProfession", profession)}>Zmień</button> : null}
                        {userProfession === "dispatcher" ?
                            <Dispatcher id={_id} /> : null}
                        {userProfession === "doctor" ?
                            <Doctor id={_id} /> : null}
                        {userProfession === "paramedic" ?
                            <Paramedic id={_id} /> : null}
                    </tr>
                    <tr>
                        <td>Uprawnienia:</td>
                        <td>
                            {edit ?
                                <select name="userPermission"
                                    onChange={handlePermission}>
                                    <option value="1">Administrator</option>
                                    <option value="2">Użytkownik</option>
                                    <option value="3">Brak</option>
                                </select> :
                                permissionText}
                        </td>
                        {edit ? <button name="userPermission" onClick={() => handleApply("userPermission", permission)}>Zmień</button> : null}
                    </tr>
                </tbody>
            </table>
            <label>
                <button onClick={toggleEdit}>Edytuj</button>
                <button>Usuń</button>
            </label>
        </div>
    )
}

export default User;