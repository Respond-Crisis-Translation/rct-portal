import React, { useEffect, useState } from "react";
import formatDate from "../../assets/helpers/formatDate";
import lang_short from "../../assets/lists/langShort";
import * as CaseService from "../../services/CaseService";

export default ({
  first_name,
  last_name,
  translator_id,
  task_in_progress,
  languages,
}) => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState(null);

  const getPendingCases = () => {
    CaseService.getCases("Pending")
      .then((snapshot) => {
        let temp = snapshot.docs.map((doc) => doc.data());
        Object.values(temp).forEach((element) => {
          element.checked = false;
        });
        setCases(temp);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPendingCases();
  }, []);

  return (
    <>
      <button
        className="uk-button  uk-button-primary uk-button-small uk-margin-small-right"
        type="button"
        uk-toggle={"target: #modal-example-" + translator_id}
      >
        Assign
      </button>

      <div id={"modal-example-" + translator_id} uk-modal="">
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-default"
            type="button"
            uk-close=""
          ></button>
          <div className="uk-modal-body">
            <h2 className="uk-modal-title">Assign Task</h2>
            <div uk-grid="">
              <div className="uk-width-auto">
                <p>
                  <b>Translator</b>
                </p>
                <p>
                  {first_name} {last_name} ({task_in_progress})
                </p>
              </div>
              <div className="uk-width-auto">
                <p>
                  <b>Language(s)</b>
                </p>
                {languages.map((language, y) => (
                  <div
                    key={
                      first_name +
                      last_name +
                      language.language +
                      " language(s) " +
                      y
                    }
                  >
                    {language.fromEnglish ? (
                      <span
                        className="uk-label"
                        key={
                          first_name +
                          last_name +
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
                          first_name +
                          last_name +
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
              </div>
            </div>
            <p>
              <b>Task Assignment</b>
            </p>
            <table className="uk-table uk-table-divider">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Language</th>
                  <th>Case Number</th>
                  <th>Due Date</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr key="loading...">
                    <td>loading</td>
                  </tr>
                ) : (
                  cases.map((task) => (
                    <tr key={`${task.id} task`}>
                      <td>
                        {task.first_name} {task.last_name}
                      </td>
                      <td>
                        <span className="uk-label">
                          {lang_short[task.fromLanguage]} &#9658;{" "}
                          {lang_short[task.toLanguage]}
                        </span>
                      </td>
                      <td>{task.case_number}</td>
                      <td>{formatDate(task.due_date)}</td>
                      <td>
                        <input
                          type="checkbox"
                          value={task.checked}
                          onClick={() => {
                            let tempCases = cases;
                            Object.values(tempCases).forEach((value) => {
                              if (value.id === task.id) {
                                value.checked = !task.checked;
                                value.translator.first_name = first_name;
                                value.translator.last_name = last_name;
                                value.translator.id = translator_id;
                              }
                            });
                            setCases(tempCases);
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
                Object.values(cases).forEach((element) => {
                  if (element.checked) {
                    CaseService.assignCase(element.id, "Assigned", {
                      first_name,
                      last_name,
                      id: translator_id,
                    });
                  }
                  getPendingCases();
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
