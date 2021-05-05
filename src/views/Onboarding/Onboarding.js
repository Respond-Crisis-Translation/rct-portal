import React from "react";
import "./Onboarding.css";
import TranslationTest from "../../assets/lists/translationTest";
import lang_short from "../../assets/lists/langShort";

import formatDate from "../../assets/helpers/formatDate";
import Sidebar from "../../components/Sidebar/Sidebar";

import * as TranslatorService from "../../services/TranslatorService";

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      translators: [],
    };
  }

  componentDidMount() {
    this.loadApplications();
  }

  loadApplications() {
    TranslatorService.getTranslators("PENDING").then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      this.setState({ translators: data });
    });
  }

  updateApplication(translatorId, status) {
    TranslatorService.updateStatus(translatorId, status).then(
      () => {
        // show pop up with success
        // `Successfully ${status} the application.`
        this.loadApplications();
      },
      (err) => {
        // show pop up with failure
        console.log(err);
      }
    );
  }

  render() {
    const { translators } = this.state;
    return (
      <>
        <Sidebar active="onboarding" />
        <div className="tm-main uk-section uk-section-default">
          <div
            className="uk-container uk-position-relative uk-margin-remove"
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              marginRight: "0px",
            }}
          >
            <table className="uk-table uk-table-divider">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Language(s)</th>
                  <th>Application Date</th>
                  <th>Specialty</th>
                  <th>Application Status</th>
                </tr>
              </thead>
              <tbody>
                {translators.map((onboard, i) => (
                  <React.Fragment
                    key={onboard.first_name + onboard.last_name + " " + i}
                  >
                    <tr
                      onClick={() => {
                        this.setState({
                          show: this.state.show === i ? null : i,
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        {onboard.first_name} {onboard.last_name}
                      </td>
                      <td>
                        {onboard.languages.map((language, y) => (
                          <div
                            key={
                              onboard.first_name +
                              onboard.last_name +
                              language.language +
                              " language(s) " +
                              i +
                              " " +
                              y
                            }
                          >
                            {language.fromEnglish ? (
                              <span
                                className="uk-label"
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  " from English to " +
                                  language.langauge +
                                  " language(s) " +
                                  i +
                                  " " +
                                  y
                                }
                              >
                                {lang_short["English"]} &#9658;{" "}
                                {lang_short[language.language]}
                              </span>
                            ) : (
                              ""
                            )}
                            {language.toEnglish ? (
                              <span
                                className="uk-label"
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  language.language +
                                  " to English " +
                                  " language(s) " +
                                  i +
                                  " " +
                                  y
                                }
                              >
                                {lang_short[language.language]} &#9658;{" "}
                                {lang_short["English"]}
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        ))}
                      </td>
                      <td>{formatDate(onboard.date_submitted)}</td>
                      <td>
                        {onboard.languages.map((lang, z) => (
                          <span
                            className="uk-label"
                            key={
                              onboard.first_name +
                              onboard.last_name +
                              lang.language +
                              " " +
                              i +
                              " " +
                              z
                            }
                          >
                            {lang.experience.join(", ")}
                          </span>
                        ))}
                      </td>
                      <td>{onboard.status}</td>
                    </tr>
                    <tr
                      style={{
                        display: this.state.show === i ? "" : "none",
                        borderTop: "none",
                      }}
                    >
                      <td colSpan={5}>
                        <p>
                          <b>Email</b>
                        </p>
                        <p>{onboard.email}</p>
                        <p>
                          <b>Reason for joining</b>
                        </p>
                        <p>{onboard.about}</p>
                        <div uk-grid="">
                          <div className="uk-width-auto">
                            <p>
                              <b>Language Support</b>
                            </p>
                            {onboard.languages.map((language, b) => (
                              <div
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  language.language +
                                  " language_support " +
                                  i +
                                  " " +
                                  b
                                }
                              >
                                {language.fromEnglish ? (
                                  <p
                                    key={
                                      onboard.first_name +
                                      onboard.last_name +
                                      " English to " +
                                      language.language +
                                      " language_support " +
                                      i +
                                      " " +
                                      b
                                    }
                                  >
                                    English to {language.language}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {language.toEnglish ? (
                                  <p
                                    key={
                                      onboard.first_name +
                                      onboard.last_name +
                                      language.language +
                                      " to English " +
                                      " language_support " +
                                      i +
                                      " " +
                                      b
                                    }
                                  >
                                    {language.language} to English
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Oral Translation</b>
                            </p>
                            {onboard.languages.map((language, b) =>
                              language.oral ? (
                                <div
                                  key={
                                    onboard.first_name +
                                    onboard.last_name +
                                    language.language +
                                    " oral translation " +
                                    i +
                                    " " +
                                    b
                                  }
                                >
                                  {language.toEnglish ? (
                                    <p
                                      key={
                                        onboard.first_name +
                                        onboard.last_name +
                                        language.language +
                                        " to English " +
                                        " oral translation " +
                                        i +
                                        " " +
                                        b
                                      }
                                    >
                                      {language.language} to English
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  {language.fromEnglish ? (
                                    <p
                                      key={
                                        onboard.first_name +
                                        onboard.last_name +
                                        " English to " +
                                        language.language +
                                        " oral translation " +
                                        i +
                                        " " +
                                        b
                                      }
                                    >
                                      English to {language.language}
                                    </p>
                                  ) : (
                                    <span></span>
                                  )}
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Sources</b>
                            </p>
                            {onboard.found_us.map((sources, p) => (
                              <p
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  sources +
                                  " sources " +
                                  i +
                                  " " +
                                  p
                                }
                              >
                                {sources}
                              </p>
                            ))}
                          </div>
                        </div>
                        {onboard.additonal_languages ? (
                          <div>
                            <b>Additional Languages: </b>
                            {": "}
                            <i>{onboard.additonal_languages}</i>
                          </div>
                        ) : (
                          ""
                        )}

                        {onboard.languages.map((language, b) => (
                          <div
                            key={
                              onboard.first_name +
                              onboard.last_name +
                              " language_test " +
                              language.language +
                              i +
                              " " +
                              b
                            }
                          >
                            {language.toEnglish ? (
                              <React.Fragment
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  " language_test to English from " +
                                  language.language +
                                  i +
                                  " " +
                                  b
                                }
                              >
                                <p>
                                  <b>{language.language} to English</b>
                                </p>
                                <div uk-grid="">
                                  <div className="uk-width-1-2">
                                    <p>
                                      <i>Original Text</i>
                                    </p>
                                    <p>{TranslationTest[language.language]}</p>
                                  </div>
                                  <div className="uk-width-1-2">
                                    {language.test_time ? (
                                      <p>
                                        answer:
                                        {new Date(language.test_time * 1000)
                                          .toISOString()
                                          .substr(11, 8)}
                                      </p>
                                    ) : (
                                      <span></span>
                                    )}
                                    <p>
                                      <i>Translated Text</i>
                                    </p>
                                    <p>{language.toTranslation}</p>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : (
                              ""
                            )}

                            {language.fromEnglish ? (
                              <React.Fragment
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  " from English language_test " +
                                  language.language +
                                  i +
                                  " " +
                                  b
                                }
                              >
                                <p>
                                  <b>English to {language.language}</b>
                                </p>
                                <div uk-grid="">
                                  <div className="uk-width-1-2">
                                    <p>
                                      <i>Original Text</i>
                                    </p>
                                    <p>{TranslationTest["English"]}</p>
                                  </div>
                                  <div className="uk-width-1-2">
                                    {language.test_time ? (
                                      <p>
                                        answer:
                                        {new Date(language.test_time * 1000)
                                          .toISOString()
                                          .substr(11, 8)}
                                      </p>
                                    ) : (
                                      <span></span>
                                    )}
                                    <p>
                                      <i>Translated Text</i>
                                    </p>
                                    <p>{language.fromTranslation}</p>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                        <div className="uk-clearfix">
                          <div className="uk-float-left"></div>
                          <div className="uk-float-right">
                            <button
                              className="uk-button uk-button-danger"
                              style={{ marginRight: "5px" }}
                              onClick={() =>
                                this.updateApplication(onboard.id, "REJECTED")
                              }
                            >
                              Reject
                            </button>
                            <button
                              className="uk-button uk-button-primary"
                              onClick={() =>
                                this.updateApplication(onboard.id, "APPROVED")
                              }
                            >
                              Approve
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
