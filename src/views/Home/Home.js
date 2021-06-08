import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../assets/helpers/formatDate";
import lang_short from "../../assets/lists/langShort";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth } from "../../firebase";
import * as CaseService from "../../services/CaseService";
import * as DocumentService from "../../services/DocumentService";
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
            const { cases } = this.state;
            data.forEach((c) => {
              DocumentService.getDocuments(c.id).then(
                (snapshot) => {
                  const docs = [];
                  snapshot.forEach((doc) => docs.push(doc.data()));
                  c.documents = docs;
                  cases.push(c);

                  this.setState({ cases });
                },
                (err) => {
                  console.log(err);
                }
              );
            });
          })
          .catch(() => this.setState({ errorCode: "create-list-error" }));
      }
    });
  }

  getNoCasesMessage() {
    const { cases } = this.state;
    return !cases || cases.length === 0 ? (
      <div>
        <p className="ErrorMessage">
          Welcom to Respond Crisis Translators Network!
        </p>
        <p>No Cases has been assigned to you at this time</p>
      </div>
    ) : (
      <div></div>
    );
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
              maxWidth: "none"
            }}
          >
            <div
              className="uk-grid-small uk-flex-center"
              uk-grid=''
              uk-height-match="target: > div > a > .uk-card-body"
              style={{ marginRight: "0px" }}
            >
              {this.getNoCasesMessage()}
              {cases.map((c, index) => (
                <div className="uk-width-large" key={index}>
                  <Link
                    key={index}
                    to={`/case/${c["id"]}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="uk-card-default uk-card-hover uk-card-body">
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
