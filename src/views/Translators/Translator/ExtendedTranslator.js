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
            <b>Language Supports</b>
          </p>
          {onboard.languages?.map((language, b) => (
            <p
              key={
                onboard.first_name +
                onboard.last_name +
                language.from_langauge +
                language.to_language +
                " language_support " +
                i +
                " " +
                b
              }
            >
              {language.from_langauge} to {language.to_language}
            </p>
          ))}
        </div>
        <div className="uk-width-auto">
          <p>
            <b>Oral Translation</b>
          </p>
          {onboard.languages?.map((language, b) =>
            language.oral ? (
              <p
                key={
                  onboard.first_name +
                  onboard.last_name +
                  language.from_langauge +
                  language.to_language +
                  " oral translation " +
                  i +
                  " " +
                  b
                }
              >
                {language.from_langauge} to {language.to_language}
              </p>
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
