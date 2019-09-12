import React, { Component } from "react";
import { Input, Button, Container, Label } from "reactstrap";

import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "", error: "" };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleNameChange(event) {
    if (event != null) {
      this.setState({ email: event.target.value });
    }
  }

  handlePasswordChange(event) {
    if (event != null) {
      this.setState({ password: event.target.value });
    }
  }

  login() {
    const userLoginRequest = {
      email: this.state.email,
      password: this.state.password
    };
    fetch("api/userLogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLoginRequest)
    })
      .then(response => response.json())
      .then(userId => {
        if (userId > 0) {
          localStorage.setItem("userId", userId);
          this.props.history.push({ pathname: "/Home" });
        } else {
          alert("Login failed");
        }
      });
  }

  render() {
    const userId = localStorage.getItem("userId");
    if (userId != null) {
      this.props.history.push({ pathname: "/Home" });
    }
    return (
      <div>
        <Container>
          <Label for="name">Email</Label>
          <Input
            type="name"
            name="name"
            id="name"
            onChange={this.handleNameChange}
          />
          <Label for="pass">Password</Label>
          <Input
            type="password"
            name="pass"
            id="pass"
            onChange={this.handlePasswordChange}
          />
          <Button onClick={this.login}>Login</Button>{" "}
          <Button tag={Link} to="/Register">
            Register
          </Button>
        </Container>
      </div>
    );
  }
}

export default Login;
