import { Component } from 'react';
import axios from 'axios';

import { API_KEY } from '../apiKey';

class Hospitals extends Component {
    state = {
        hospitalName: "",
        hospitalAddress: "",
        hospitalCity: "",
        hospitalPostalCode: "",
        hospitalPhoneNumber: "",
        hospitalEmailAddress: "",
        hospitalLocalization: [],
        numberOfFreeBeds: 1,
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

        axios.post('http://localhost:3000/hospitals/add', this.state)
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
                <p>Szpitale</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nazwa:
                        <input type="text"
                            name="hospitalName"
                            value={this.state.hospitalName}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Adres:
                        <input type="text"
                            name="hospitalAddress"
                            value={this.state.hospitalAddress}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Miasto:
                        <input type="text"
                            name="hospitalCity"
                            value={this.state.hospitalCity}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Kod pocztowy:
                        <input type="text"
                            name="hospitalPostalCode"
                            value={this.state.hospitalPostalCode}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Nr telefonu:
                        <input type="tel"
                            name="hospitalPhoneNumber"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                            value={this.state.hospitalPhoneNumber}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Adres e-mail:
                        <input type="email"
                            name="hospitalEmailAddress"
                            value={this.state.hospitalEmailAddress}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Ilość wolnych łóżek:
                        <input type="number"
                            name="numberOfFreeBeds"
                            min="1"
                            value={this.state.numberOfFreeBeds}
                            onChange={this.handleChange} />
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

export default Hospitals;