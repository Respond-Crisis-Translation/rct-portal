import React, { useEffect, useState } from "react";
import * as TranslatorService from "../../services/TranslatorService";
import * as CaseService from "../../services/CaseService";
import lang_short from "../../assets/lists/langShort";

export default ({ currentCase, loadComp }) => {
  const [loading, setLoading] = useState(true);
  const [translators, setTranslators] = useState(null);
  const [checkedTranslator, setCheckedTranslator] = useState(null);

  const getTranslators = () => {
    TranslatorService.getTranslators("APPROVED")
      .then((snapshot) => {
        let temp = snapshot.docs.map((doc) => doc.data());
        Object.values(temp).forEach((element) => {
          element.checked = false;
        });
        setTranslators(temp);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTranslators();
  }, []);

  return (
    <>
      <button
        className="uk-button  uk-button-primary uk-button-small uk-margin-small-right"
        type="button"
        uk-toggle={"target: #modal-example-" + currentCase.id}
      >
        Assign
      </button>

      <div
        id={"modal-example-" + currentCase.id}
        uk-modal=""
        onClick={(e) => e.stopPropagation()}
      >
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-default"
            type="button"
            uk-close=""
          ></button>
          <div className="uk-modal-body">
            <h2 className="uk-modal-title">Assign Translator</h2>
            <div uk-grid="">
              <div className="uk-width-auto">
                <p>
                  <b>Case Number</b>
                </p>
                <p>{currentCase.case_number}</p>
              </div>
              <div className="uk-width-auto">
                <p>
                  <b>Source</b>
                </p>
                <p>{currentCase.source}</p>
              </div>
              <div className="uk-width-auto">
                <p>
                  <b>Client</b>
                </p>
                <p>
                  {currentCase.first_name} {currentCase.last_name}
                </p>
              </div>
              <div className="uk-width-auto">
                <p>
                  <b>Language</b>
                </p>
                <p>
                  <span className="uk-label">
                    {lang_short[currentCase.fromLanguage]} &#9658;{" "}
                    {lang_short[currentCase.toLanguage]}
                  </span>
                </p>
              </div>
            </div>

            <table className="uk-table uk-table-divider">
              <thead>
                <tr>
                  <th>Translator</th>
                  <th>Languages</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr key="loading...">
                    <td>loading</td>
                  </tr>
                ) : (
                  translators.map((onboard) => (
                    <tr key={`${onboard.id} task`}>
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
                      <td>
                        <input
                          type="radio"
                          value={onboard.id}
                          checked={checkedTranslator === onboard.id}
                          onClick={() => {
                            setCheckedTranslator(onboard.id);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="uk-modal-footer uk-text-right">
            <button
              className="uk-button uk-button-primary uk-modal-close"
              type="button"
              onClick={() => {
                Object.values(translators).forEach((element) => {
                  if (element.id === checkedTranslator) {
                    CaseService.assignCase(currentCase.id, "Assigned", {
                      first_name: element.first_name,
                      last_name: element.last_name,
                      id: element.id,
                    }).then((res) => {
                    });
                  }
                });
              }}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
