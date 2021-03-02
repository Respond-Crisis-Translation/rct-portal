import React, { useState } from "react";
import Navigation from "./Navigation";
import TranslationAssesment from "./TranslationAssesment";
import ReferralSource from "./ReferralSource";
import Support from "./Support";
import LanguageKnown from "./LanguageKnown";
import TranslationCapability from "./TranslationCapability";

export default ({ onChange, previous, advance, answers, languages }) => {
  const [lang, setLang] = useState([]);
  const [toLang, setToLang] = useState([]);
  const [fromLang, setFromLang] = useState([]);
  const [otherField, setOtherField] = useState(false);
  return (
    <div>
      {/* eslint-disable */}
      <Navigation lang={lang} />
      <ul className="uk-switcher uk-margin">
        <li>
          <Support onChange={onChange} previous={previous} answers={answers} />
        </li>
        <li>
          <ReferralSource
            onChange={onChange}
            answers={answers}
            otherField={otherField}
            setOtherField={setOtherField}
          />
        </li>
        <li>
          <LanguageKnown
            onChange={onChange}
            languages={languages}
            lang={lang}
            setLang={setLang}
          />
        </li>
        <li>
          <TranslationCapability
            onChange={onChange}
            languages={languages}
            lang={lang}
            fromLang={fromLang}
            setFromLang={setFromLang}
            toLang={toLang}
            setToLang={setToLang}
          />
        </li>
        {lang.map((l, index) => (
          <li key={l + " experience"}>
            <label className="uk-form-label">
              For {l}, have you had experience in any of the following? (click
              all that apply)
            </label>
            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              {Object.keys(languages[l]["experience"]).map((ex, index) => (
                <label key={l + " experience " + "option " + index}>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    checked={languages[l]["experience"][ex]["checked"]}
                    onClick={() => {
                      let temp = languages;
                      temp[l]["experience"][ex]["checked"] = !temp[l][
                        "experience"
                      ][ex]["checked"];
                      onChange({ languages: temp });
                    }}
                    readOnly
                  />{" "}
                  {languages[l]["experience"][ex]["description"]}
                </label>
              ))}
            </div>
            <button
              className="uk-button uk-button-primary uk-button-small"
              uk-switcher-item="previous"
            >
              Back
            </button>
            <button
              className="uk-button uk-button-primary uk-button-small"
              uk-switcher-item="next"
            >
              Next
            </button>
          </li>
        ))}
        {lang.map((l, index) => (
          <li key={l + " oral"}>
            <div className="uk-width-1-1">
              <label className="uk-form-label">
                For {l}, besides translating documents, would you be willing to
                provide oral translation?
              </label>
              <label className="uk-width-1-1">
                <input
                  className="uk-radio"
                  type="radio"
                  name="support"
                  value={true}
                  onChange={() => {
                    let temp = languages;
                    temp[l]["oral"] = true;
                    onChange({ languages: temp });
                  }}
                />{" "}
                Yes
              </label>
              <label className="uk-width-1-1">
                <input
                  className="uk-radio"
                  type="radio"
                  name="support"
                  value={false}
                  onChange={() => {
                    let temp = languages;
                    temp[l]["oral"] = false;
                    onChange({ languages: temp });
                  }}
                />{" "}
                No
              </label>
            </div>
            <button
              className="uk-button uk-button-primary uk-button-small"
              onClick={previous}
            >
              Back
            </button>
            <button
              className="uk-button uk-button-primary uk-button-small"
              uk-switcher-item="next"
              disabled={languages[l]["oral"] !== undefined ? false : true}
            >
              Next
            </button>
          </li>
        ))}
        <li>
          <TranslationAssesment previous={previous} advance={advance} />
        </li>
      </ul>
    </div>
  );
};
