import React, { useEffect, useState } from "react";
import * as TranslatorService from "../../services/TranslatorService";

export default ({
  case_id,
}) => {
  const [loading, setLoading] = useState(true);
  const [translators, setTranslators] = useState(null);

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
        uk-toggle={"target: #modal-example-" + case_id}
      >
        Assign
      </button>

      <div id={"modal-example-" + case_id} uk-modal="">
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
                  <b>Case</b>
                </p>
                <p>
                  lorem ipsum
                </p>
              </div>
            </div>
            <p>
              <b>Task Assignment</b>
            </p>
            <table className="uk-table uk-table-divider">
              <thead>
                <tr>
                  <th>Translator</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr key="loading...">
                    <td>loading</td>
                  </tr>
                ) : (
                  translators.map((task) => (
                    <tr key={`${task.id} task`}>
                      <td>
                        {task.first_name} {task.last_name}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          value={task.checked}
                          onClick={() => {
                            let tempTranslators = translators;
                            Object.values(tempTranslators).forEach((value) => {
                              if (value.id === task.id) {
                                value.checked = !task.checked;
                              }
                            });
                            setTranslators(tempTranslators);
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
                  getTranslators();
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
