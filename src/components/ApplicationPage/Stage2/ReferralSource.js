import React from "react";
import Organizations from "../../../assets/lists/knownOrganizations";

export default ({ answers, onChange, setOtherField, otherField }) => {
  return (
    <>
      <div className="uk-width-1-1">
        <label className="uk-form-label">How did you hear about us?</label>
        {Organizations.map((org, index) => (
          <div key={"org " + index} className="uk-margin">
            <label>
              <input
                className="uk-radio"
                type="radio"
                name="find_us"
                onChange={() => {
                  let editAnswer = answers;
                  editAnswer["find_us"] = [org];
                  onChange({ answers: editAnswer });
                  setOtherField(false);
                }}
              />{" "}
              {org}
            </label>
          </div>
        ))}
        <div className="uk-margin">
          <label className="uk-form-label">
            <input
              className="uk-radio"
              type="radio"
              name="find_us"
              onChange={() => {
                setOtherField(!otherField);
                let editAnswer = answers;
                editAnswer["find_us"] = undefined;
                onChange({ answers: editAnswer });
              }}
            />{" "}
            {otherField ? (
              <input
                className="uk-input uk-form-width-medium"
                placeholder="Other"
                name="find_us"
                onChange={(value) => {
                  let editAnswer = answers;

                  editAnswer["find_us"] = value.target.value
                    ? value.target.value
                    : undefined;
                  onChange({ answers: editAnswer });
                }}
              />
            ) : (
              "Other"
            )}
          </label>
        </div>
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
        disabled={answers["find_us"] !== undefined ? false : true}
      >
        Next
      </button>
    </>
  );
};
