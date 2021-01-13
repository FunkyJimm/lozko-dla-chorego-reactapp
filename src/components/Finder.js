import { Component } from 'react';
import axios from 'axios';

import { API_KEY } from '../apiKey';
import User from './User';

class Finder extends Component {
    state = {
        searchType: "userLogin",
        searchInput: "",
        searchFilter: 2,
        apiKey: API_KEY,
        errorMessage: "",
        userResponse: null
    }

    handleSelect = e => {
        this.setState({
            searchType: e.target.value
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        axios.post(`http://localhost:3000/users/find`, this.state)
            .then(response => {
                if (response.data._id) {
                    this.setState({
                        userResponse: response.data
                    })
                } else {
                    this.setState({
                        errorMessage: response.data
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.data
                })
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Wyszukaj po:
                        <select name="searchType"
                            onChange={this.handleSelect}>
                            <option value="userLogin">Nazwa</option>
                            <option value="userName">Imię</option>
                            <option value="userSurname">Nazwisko</option>
                            <option value="userPhoneNumber">Nr telefonu</option>
                            <option value="userEmailAddress">Adres e-mail</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Wprowadź:
                        <input type="text"
                            name="searchInput"
                            value={this.state.searchInput}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <button type="submit">Szukaj</button>
                    <br />
                    {this.state.errorMessage ? <span id="error">{this.state.errorMessage}</span> : ""}
                    {this.state.userResponse ? <User props={this.state.userResponse} /> : ""}
                </form>
            </div>
        )
    }
}

export default Finder;