import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default class UnauthorizedPage extends React.Component {
  render() {
    return (
      <>
        <Sidebar />
        <div className="tm-main uk-section uk-section-default">
          <div className="uk-container uk-position-relative uk-margin-remove">
            <Link
              to="/mycases"
              className="uk-button uk-button-default uk-margin-bottom"
              type="button"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
            <ErrorMessage errorCode="unauthorized-access"></ErrorMessage>
          </div>
        </div>
      </>
    );
  }
}
