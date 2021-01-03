import { Component } from 'react';
import axios from 'axios';

import { API_KEY } from '../apiKey';

class Ambulances extends Component {
    state = {
        ambulanceRegistrationNumber: "",
        ambulanceType: "S",
        ambulanceLocalization: "",
        apiKey: API_KEY,
        errorMessage: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:3000/ambulances/add', this.state)
            .then(response => {
                console.log(response);
                this.setState({
                    errorMessage: response.data
                })
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    render() {
        return (
            <div>
                <p>Ambulanse</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nr rejestracyjny:
                        <input type="text"
                            name="ambulanceRegistrationNumber"
                            value={this.state.hospitalName}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Typ ambulansu:
                        <select name="ambulanceType"
                            onChange={this.handleChange}>
                            <option value="S">Specjalistyczny</option>
                            <option value="P">Podstawowy</option>
                            <option value="T">Transportowy</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Zapisz</button>
                    <br />
                    {this.state.errorMessage ? <span id="error">{this.state.errorMessage}</span> : ""}
                </form>
            </div>
        )
    }
}

export default Ambulances;