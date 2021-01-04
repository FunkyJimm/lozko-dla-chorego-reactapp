import { Component } from 'react';
import axios from 'axios';

import { API_KEY } from '../../apiKey';

class Registration extends Component {
    state = {
        userLogin: "",
        userPassword: "",
        userName: "",
        userSurname: "",
        userAddress: "",
        userCity: "",
        userPostalCode: "",
        userPhoneNumber: "",
        userEmailAddress: "",
        apiKey: API_KEY,
        regCheck: false,
        errorMessage: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = e => {
        this.setState({
            regCheck: !this.state.regCheck
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.regCheck) {
            axios.post('http://localhost:3000/users/add', this.state)
                .then(response => {
                    console.log(response);
                    this.setState({
                        errorMessage: response.data
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            this.setState({
                errorMessage: "Musisz zaakceptować regulamin!"
            })
        }
    }

    render() {
        return (
            <div>
                <p>Rejestracja użytkownika</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Login:
                        <input type="text"
                            name="userLogin"
                            value={this.state.userLogin}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Hasło:
                        <input type="password"
                            name="userPassword"
                            value={this.state.userPassword}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Imię:
                        <input type="text"
                            name="userName"
                            value={this.state.userName}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Nazwisko:
                        <input type="text"
                            name="userSurname"
                            value={this.state.userSurname}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Adres:
                        <input type="text"
                            name="userAddress"
                            value={this.state.userAdress}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Miasto:
                        <input type="text"
                            name="userCity"
                            value={this.state.userCity}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Kod pocztowy:
                        <input type="text"
                            name="userPostalCode"
                            value={this.state.userPostalCode}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Nr telefonu:
                        <input type="tel"
                            name="userPhoneNumber"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                            value={this.state.userPhoneNumber}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Adres e-mail:
                        <input type="email"
                            name="userEmailAddress"
                            value={this.state.userEmailAddress}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Zaakceptuj regulamin:
                        <input type="checkbox"
                            name="regCheck"
                            value={this.state.regCheck}
                            onChange={this.handleCheck} />
                    </label>
                    <br />
                    <button type="submit">Zarejestruj</button>
                    <br />
                    {this.state.errorMessage ? <span id="error">{this.state.errorMessage}</span> : ""}
                </form>
            </div >
        )
    }
}

export default Registration;