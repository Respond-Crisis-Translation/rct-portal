import React from "react";
import "./Sidebar.css";
import Links from "./lists/links";
import Logo from "../../assets/images/Respond_Logo_icon_fullcolor.png";
import { useAuth } from "../Auth/Auth";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

export default ({ active }) => {
  const { user, signout } = useAuth();

  const [userType, setUserType] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setUserType(null);
    fetchUserType();
  }, []);

  const fetchUserType = () =>
    auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      const role = idTokenResult.claims.role;
      if (!role || role === "translator") {
        setUserType({ role: "translator", name: "translator" });
      } else if (role === "admin" || role === "super_admin") {
        setUserType({ role: "admin", name: role });
      }
    });

  return userType ? (
    <div className="tm-sidebar-left uk-visible@m">
      <div className="uk-margin-large-bottom" style={{ paddingLeft: "10px" }}>
        <img
          src={Logo}
          width={50}
          height={50}
          alt="Respond Crisis Translation Logo"
        />
      </div>
      <div className="uk-margin-large-bottom" style={{ paddingLeft: "10px" }}>
        <h3 className="uk-card-title uk-margin-remove-bottom">
          {user?.displayName}
        </h3>
        <p
          className="uk-text-meta uk-margin-remove-top"
          style={{ color: "black" }}
        >
          {userType.name}
        </p>
      </div>
      <ul className="uk-nav uk-nav-primary uk-nav-left uk-margin-auto-vertical">
        {Links.map((link, index) =>
          link.visibility === userType.role || link.visibility === "all" ? (
            <li
              key={link.display + index}
              className={active === link.active ? `uk-active` : ""}
            >
              <a href={link.link}>{link.display}</a>
            </li>
          ) : (
            ""
          )
        )}
        <li>
          <a href="/#" onClick={() => signout().then(() => history.push("/"))}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  ) : (
    <div></div>
  );
};
