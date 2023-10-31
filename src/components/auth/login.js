import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users_name: "",
      users_email: "",
      users_password: "",
      errorText: "",
      isRegistering: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.users_name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://the-basque-shop-backend-r-production.up.railway.app/login",
        { users_email: this.state.users_email,
          users_password: this.state.users_password,
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
          console.log("Sesion iniciada")
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

  handleRegister() {
    const { users_name, users_email, users_password } = this.state;

    axios
      .post('https://the-basque-shop-backend-r-production.up.railway.app/register', { users_name, users_email, users_password })
      .then((response) => {
        if (response.data.status === "User_created") {
          console.log('Successful registration');
          this.props.handleSuccessfulAuth();
          console.log("sesion iniciada");
        } else {
          this.setState({
            errorText: "Wrong email or password"
          });
        }
      })
      
      .catch((error) => {
        this.setState({ error: 'Error registering' });
        console.error('Error al registrarse: ', error);
      });
  };


  render() {
    const { isRegistering } = this.state;

    return (
      <div>
        <h1 className="login-title">{isRegistering ? 'REGISTER TO ACCESS THE PAYMENT PROCESS' : 'LOG IN TO ACCESS THE PAYMENT PROCESS'}</h1>
        <div className="login-data">
        {isRegistering && (
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => this.setState({ users_name: e.target.value })}
            value={this.state.users_name}
          />
        )}
        <input
          type="text"
          placeholder="Your email"
          onChange={(e) => this.setState({ users_email: e.target.value })}
          value={this.state.users_email}
        />
        <input
          type="password"
          placeholder="Your password"
          onChange={(e) => this.setState({ users_password: e.target.value })}
          value={this.state.users_password}
        />
        {isRegistering ? (
          <button className="log-button" onClick={this.handleRegister}>Register</button>
        ) : (
          <button className="log-button" onClick={this.handleSubmit}>Log in</button>
        )}
        {this.state.error && <p>{this.state.error}</p>}
        <p>
          {isRegistering
            ? "Do you already have an account? "
            : "Don't have an account? "}
          <span className="log-option"
            onClick={() =>
              this.setState((prevState) => ({
                isRegistering: !prevState.isRegistering,
                error: '',
              }))
            }
          >
            {isRegistering ? 'Log in' : 'Register'}
          </span>
        </p>
        </div>
      </div>
    );
  }
}