import React from "react";

export default ({ updateTranslator, role, onboard, i }) => {
  return (
    <>
      <div uk-grid="">
        <div className="uk-width-auto">
          <p>
            <b>Email</b>
          </p>
          <p>{onboard.email}</p>
        </div>
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
                  ""
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
          {onboard.found_us?.map((sources, p) => (
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
        <div className="uk-width-auto">{onboard.notes}</div>
      </div>
      <div className="uk-clearfix">
        <div className="uk-float-left">
          <button className="uk-button uk-button-danger">Deactivate</button>
        </div>
        <div className="uk-float-right">
          {onboard.role === "admin" && role === "super_admin" ? (
            <button
              className="uk-button"
              style={{ marginRight: "5px" }}
              onClick={() => updateTranslator(onboard.id, "super_admin")}
            >
              Promote to Super Admin
            </button>
          ) : !onboard.role ? (
            <button
              className="uk-button"
              style={{ marginRight: "5px" }}
              onClick={() => updateTranslator(onboard.id, "admin")}
            >
              Promote to Admin
            </button>
          ) : (
            <span></span>
          )}
          <button
            className="uk-button uk-button-primary"
            style={{ marginRight: "5px" }}
          >
            Records
          </button>
          <button className="uk-button uk-button-primary">Edit</button>
        </div>
      </div>
    </>
  );
};
