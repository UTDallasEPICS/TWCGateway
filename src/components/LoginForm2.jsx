import React from "react";
import logo from "./images/The-Warren-Center-logo.png";

export default class LoginForm extends React.Component {
  submit(event) {
    event.preventDefault();

    const username = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    console.log("username:", username);
    console.log("password:", password);
  }

  render() {
    return (
      <div className="text-center">
        <div className="signin-body">
          <form className="form-signin" onSubmit={this.submit.bind(this)}>
            <img className="mb-4" src={logo} alt="" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="btn btn-lg btn-primary btn-block"
              type="submit"
              href="/home"
            >
              Sign in
            </button>
            <div className="mt-4">
              {" "}
              <a href="#">Reset password</a>
            </div>
            <p className="mt-3 mb-3 text-muted">&copy; 2022</p>
          </form>
        </div>
      </div>
    );
  }
}
