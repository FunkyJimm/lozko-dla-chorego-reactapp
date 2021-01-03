import { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { API_KEY } from '../apiKey';

const cookies = new Cookies();

class Login extends Component {
    state = {
        userLogin: "",
        userPassword: "",
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

        axios.post('http://localhost:3000/users/login', this.state)
            .then(response => {
                console.log(response);
                this.setState({
                    errorMessage: response.data.message
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <p>Logowanie:</p>

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
                    <button type="submit">Zaloguj</button>
                    <br />
                    {this.state.errorMessage ? <span id="error">{this.state.errorMessage}</span> : ""}
                </form>
            </div>
        )
    }
}

export default Login;