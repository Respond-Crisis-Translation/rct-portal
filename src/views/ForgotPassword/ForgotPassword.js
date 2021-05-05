import React, { useState } from "react";
import Logo from "../../assets/images/Respond_Logo_icon_fullcolor.png";
import Footer from "../../components/Footer/Footer";

import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../components/Auth/Auth.js";
import "./ForgotPassword.css";

function ForgotPassword() {
  const auth = useAuth();
  const history = useHistory();

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/login" } };

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getErrorMessage = () => {
    return error ? (
      <div>
        <p className="ErrorMessage"> {error} </p>
      </div>
    ) : (
      <div></div>
    );
  };

  const getSuccessMessage = () => {
    return success ? (
      <div className="uk-alert-primary" uk-alert="true">
        <a href="/#" className="uk-alert-close" uk-close="true"> </a>
        <p className="AlertMessage">
          Successfully been sent an email with instructions to reset your
          password.
        </p>
      </div>
    ) : (
      <div></div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.sendPasswordResetEmail(email).then(
      () => {
        setSuccess(true);
        setTimeout(() => history.replace(from), 3000);
      },
      () => {
        setError("Email not found! Please enter the account email!");
      }
    );
  };

  return (
    <div className="ForgotPassword">
      {getSuccessMessage()}
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

        <h4>Retrieve password</h4>
        <h5>Type in your registered email address and click Send.</h5>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <br />
            <input
              type="email"
              name="email_account"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email address here"
            />
          </label>
          <br />
          <br />
          <input type="submit" value="Send" disabled={success} />
        </form>
        <br />
        {getErrorMessage()}
        <h5>
          We will send a link to your email address with instructions to reset
          your password.
        </h5>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
