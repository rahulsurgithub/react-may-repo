import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      //Call the server
      const { data } = this.state;
      await auth.login(data.username, data.password);
      //localStorage.setItem("token", jwt);
      // redirect to home page.
      //this.props.history.push("/");
      // we should reload the page to reflect the change after login
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
      {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
