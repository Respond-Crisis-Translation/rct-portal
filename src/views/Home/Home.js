import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../assets/helpers/formatDate";
import lang_short from "../../assets/lists/langShort";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth } from "../../firebase";
import * as CaseService from "../../services/CaseService";
import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        CaseService.getMyCases(user.uid)
          .then((snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            this.setState({ cases: data });
          })
          .catch(() => this.setState({ errorCode: "create-list-error" }));
      }
    });
  }

  render() {
    const { cases } = this.state;
    return (
      <>
        <Sidebar active="mycases" />
        <div className="tm-main uk-section uk-section-default">
          <div
            className="uk-container uk-position-relative uk-margin-remove"
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              marginRight: "0px",
            }}
          >
            <div
              className="uk-child-width-1-2@s uk-child-width-1-3@m parent"
              uk-grid=""
              style={{ marginRight: "0px" }}
            >
              {cases.map((c, index) => (
                <div className="child" key={index}>
                  <Link
                    key={index}
                    to={`/case/${c["id"]}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                      <div className="uk-clearfix">
                        <div className="uk-float-left">
                          <div className="uk-label">
                            {lang_short[c["fromLanguage"]]} &#9658;{" "}
                            {lang_short[c["toLanguage"]]}
                          </div>
                        </div>
                        <div className="uk-float-right">
                          <p
                            className="uk-text-bold"
                            style={{ color: "black" }}
                          >
                            {formatDate(c["due_date"])}
                          </p>
                        </div>
                      </div>
                      <h3 className="uk-card-title uk-margin-remove">
                        {c["first_name"]} {c["last_name"]}
                      </h3>
                      <p className="uk-margin-remove">
                        {c.documents.length} documents
                      </p>
                      <p className="uk-margin-remove">#{c.case_number}</p>
                      <hr />
                      <ul>
                        {c.documents.map((doc, i) => (
                          <li key={`${doc.name} ${i}`}>{doc.name}</li>
                        ))}
                      </ul>
                      <hr />
                      <p>
                        <span className="uk-text-bold">Notes:</span>
                        {c["note"]}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
