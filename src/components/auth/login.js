import React, { Component } from 'react';
import axios from "axios";

export default class Login extends Component {
    constructor (props){
        super(props)

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Este evento es llamado siempre que haya algun cambio 
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleSubmit(event) {
        axios
            .post(
                "https://api.devcamp.space/sessions",
                {
                    client: {
                        email: this.state.email,
                        password: this.state.password
                    }
                },
                { withCredentials: true }           
            )
            .then(response => {
                //console.log("response ",  response);
                if (response.data.status === "created") {
                    //console.log("You can come in...", response);
                    this.props.handleSuccessfulAuth();
                } else {
                    this.setState({
                        errorText: "Wrong email or password"
                    });
                    this.props.handleUnsuccessfulAuth();
                }
            })
            .catch(error => {
                this.setState({
                    errorText: "An error occurred"
                });
                this.props.handleUnsuccessfulAuth();
            });
        
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

                <div>{this.state.errorText}</div>

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="email" //este es el tipo de dato que contendar el imput
                        name="email" // este es el nombre hace referencia al mail de this.state
                        placeholder="Your email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <input 
                        type="password"
                        name="password" // este es el nombre hace referencia al password de this.state
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
} 