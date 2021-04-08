import React from "react";

export default ({ onChange, languages, lang, setLang }) => {
  return (
    <>
      <label className="uk-form-label">
        Which language(s) are you able to translate?
      </label>
      <div className="uk-margin" uk-grid="">
        {Object.keys(languages).map((language, index) => (
          <div
            key={"language " + index}
            className="uk-width-1-3@m uk-width-1-2@s"
          >
            <div
              className={`uk-card uk-card-body ${
                languages[language]["checked"]
                  ? "uk-card-primary"
                  : "uk-card-default"
              }`}
              onClick={() => {
                let temp = languages;
                temp[language]["checked"] = !temp[language]["checked"];
                if (temp[language]["checked"]) {
                  let leng = lang;
                  leng.push(language);
                  setLang(leng);
                } else {
                  let langIndex = lang.indexOf(language);
                  let leng = lang.splice(langIndex, 1);
                  setLang(leng);
                }
                onChange({ languages: temp });
              }}
            >
              {language}
            </div>
          </div>
        ))}
      </div>
      <div className="uk-width-1-1">
        <label className="uk-form-label" htmlFor="addtional_languages">
          If you can provide support for languages not listed above, please list
          it below:
        </label>
        <textarea
          alt="addtional_languages"
          className="uk-textarea"
          id="addtional_languages"
          required=""
          label=""
          name="addtional_languages"
          placeholder="type your answer here"
          rows="5"
          title="addtional_languages"
          onChange={(e) => {
            onChange({ additional_languages: e.target.value });
          }}
        />
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
        disabled={lang.length > 0 ? false : true}
      >
        Next
      </button>
    </>
  );
};
