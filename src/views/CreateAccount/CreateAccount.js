import React from "react";
import Logo from "../../assets/images/Respond_Logo_icon_fullcolor.png";
import Footer from "../../components/Footer/Footer";
import "./CreateAccount.css";
import { auth } from "../../firebase";
import { Redirect, Router } from "react-router-dom";

import { createBrowserHistory } from "history";

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    // The passwords here will be viewable by "Inspect element", but this is
    // not a privacy concern as it will only be the user's own password.
    this.state = {
      oobCode: "",
      email: "",
      password: "",
      confirmPassword: "",
      loggedInUser: null,
      error: "",
    };

    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const oobCode = this.getParameterByName("oobCode");
    auth
      .verifyPasswordResetCode(oobCode)
      .then((email) => {
        this.setState({ email: email, oobCode: oobCode });
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  }

  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  updateConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  getErrorMessage() {
    if (this.state.error !== "") {
      return (
        <div>
          <p className="ErrorMessage"> {this.state.error} </p>
        </div> 
        )
    } else {
      return (
        <div>
        </div>
        )
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "Passwords do not match. Please fix." });
    } else if (this.state.password === "") {
      this.setState({error: "Password cannot be empty."});
    } else {
      auth
        .confirmPasswordReset(this.state.oobCode, this.state.password)
        .then((resp) => {
          auth
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(
              (userRecord) => {
                console.log(userRecord);
                // if admin, lands to cases
                // if translator, lands to my cases
                this.setState({ loggedInUser: userRecord });
              },
              (err) => {
                console.log(err);
                this.setState({ loggedInUser: null });
              }
            );
        })
        .catch((err) => {
          this.setState({error: err});
          console.log(err);
        });
    }
  }

  render() {
    const { loggedInUser } = this.state;
    let errorMessage = this.getErrorMessage();

    if (loggedInUser) {
      const newHistory = createBrowserHistory();
      return (
        <Router history={newHistory}>
          <Redirect to="/" />
        </Router>
      );
    }
    return (
      <div className="CreateAccount">
        <div className="UserInformation">
          <img
            className="Logo"
            src={Logo}
            width={50}
            height={50}
            alt="Respond Crisis Translation Logo"
          />
          <br />
          <br />

          <h4>Create login information</h4>
            <section>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Email (account name):
                  <br />
                  <input
                    readOnly={true}
                    type="email"
                    value={this.state.email}
                    name="email_account"
                  />
                </label>
                <br />
                <label>
                  Create a password:
                  <br />
                  <input
                    type="password"
                    name="password"
                    onChange={this.updatePassword}
                    placeholder="enter password here"
                  />
                </label>
                <br />
                <label>
                  Please re-enter your password:
                  <br />
                  <input
                    type="password"
                    name="confirm-password"
                    onChange={this.updateConfirmPassword}
                    placeholder="re-enter password here"
                  />
                </label>
                <br />
                {errorMessage}
                <br />
                <input type="submit" value="Complete" />
              </form>
            </section>
        </div>
        <Footer />
      </div>
    );
  }
}
