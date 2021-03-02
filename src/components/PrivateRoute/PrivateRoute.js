import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../Auth/Auth.js";
import { auth } from "../../firebase";

const PrivateRoute = ({ children, requiredRole, ...rest }) => {
  const currAuth = useAuth();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(null);
    setLoading(true);
    fetchUserRole();
  }, []);

  const fetchUserRole = () => {
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult().then(
        (idTokenResult) => {
          const currRole = idTokenResult.claims.role;
          if (currRole === "admin" || currRole === "super_admin") {
            setRole("admin");
          }
          setLoading(false);
        },
        () => setLoading(false)
      );
    } else {
      setLoading(false);
    }
  };

  const hasRole = !requiredRole || requiredRole === role;
  return loading ? (
    <div></div>
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        currAuth.user && hasRole ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: currAuth.user ? "/unathorized" : "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
