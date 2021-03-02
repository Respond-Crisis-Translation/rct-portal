import React, { useState } from "react";

import Logo from "../../assets/images/Respond_Logo_icon_fullcolor.png";
import Footer from "../../components/Footer/Footer";
import "./Login.css";
import { useAuth } from "../../components/Auth/Auth.js";
import { useHistory, useLocation } from "react-router-dom";

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [error, setError] = useState("");

  const updateEmail = (e) => {
    if (error) {
      setError("");
    }
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    if (error) {
      setError("");
    }
    setPassword(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signin(email, password).then(
      (user) => {
        if (user && user.uid) {
          // redirect
          history.replace(from);
        } else {
          setError("Invalid Credentials! Please try with valid ones!");
        }
      },
      () => {
        setError("Invalid Credentials! Please try with valid ones!");
      }
    );
  };

  return (
    <div className="Login">
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

        <h4>Sign in</h4>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <br />
            <input
              type="email"
              name="email_account"
              onChange={updateEmail}
              value={email}
              placeholder="your email address here"
            />
          </label>
          <br />
          <label>
            Password:
            <br />
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="your password here"
            />
          </label>
          <br />
          <a href="/forgotpassword">forgot password?</a>
          <br />
          <br />
          <input
            type="checkbox"
            checked={rememberMe}
            name="rememberMe"
            value={rememberMe}
            onChange={onChangeCheckbox}
          />
          <label>Remember me</label>
          <br />
          <div>
            <p className="ErrorMessage"> {error} </p>
          </div>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
