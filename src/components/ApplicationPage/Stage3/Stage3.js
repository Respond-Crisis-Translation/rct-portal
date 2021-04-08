import React from "react";
import Navigation from "./Navigation";
import TranslationAssignments from "./TranslationAssignments";

import TranslationTest from "../../../assets/lists/translationTest";

export default ({ onChange, advance, languages }) => {
  return (
    <div>
      <Navigation languages={languages} />
      <ul className="uk-switcher uk-margin">
        {Object.keys(languages).map((l) =>
          languages[l]["checked"] &&
          languages[l]["toEnglish"] &&
          languages[l]["fromEnglish"] ? (
            <TranslationAssignments
            l={l} 
            onChange={onChange}
            languages={languages} />
          ) : languages[l]["checked"] && languages[l]["fromEnglish"] ? (
            <li key={l + "translationpartfrom"}>
              <label className="uk-form-label">
                Please translate the following English message into {l}
              </label>
              <p>{TranslationTest[l]}</p>
              <div className="uk-width-1-1">
                <label className="uk-form-label" htmlFor="translation">
                  Your answer:
                </label>
                {/* populate to translation */}
                <textarea
                  alt="translation"
                  className="uk-textarea"
                  id="translation"
                  required=""
                  label=""
                  name="translation"
                  placeholder="type your answer here"
                  rows="5"
                  title="translation"
                  onChange={(e) => {
                    let temp = languages;
                    temp[l]["toTranslation"] = e.target.value;
                    onChange({ languages: temp });
                  }}
                />
              </div>
              <button
                className="uk-button uk-button-primary uk-button-small"
                uk-switcher-item="next"
              >
                Next
              </button>
            </li>
          ) : languages[l]["checked"] && languages[l]["toEnglish"] ? (
            <li key={l + "translationpartto"}>
              <label className="uk-form-label">
                Please translate the following {l} message into English
              </label>
              <p>{TranslationTest["English"]}</p>
              <div className="uk-width-1-1">
                <label className="uk-form-label" htmlFor="translation">
                  Your answer:
                </label>
                {/* populate from translation */}
                <textarea
                  alt="translation"
                  className="uk-textarea"
                  id="translation"
                  required=""
                  label=""
                  name="translation"
                  placeholder="type your answer here"
                  rows="5"
                  title="translation"
                  onChange={(e) => {
                    let temp = languages;
                    temp[l]["fromTranslation"] = e.target.value;
                    onChange({ languages: temp });
                  }}
                />
              </div>
              <button
                className="uk-button uk-button-primary uk-button-small"
                uk-switcher-item="next"
              >
                Next
              </button>
            </li>
          ) : (
            ""
          )
        )}
        <li>
          <h1 className="uk-text-lead">
            You have completed all translations! Would you like to submit?
          </h1>
          <button
            className="uk-button uk-button-primary uk-button-small"
            onClick={() => {
              advance();
              advance();
            }}
          >
            Submit
          </button>
        </li>
      </ul>
      {/* eslint-enable */}
    </div>
  );
};
