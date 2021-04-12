import React from "react";
import formatDate from "../../../assets/helpers/formatDate";
import lang_short from "../../../assets/lists/langShort";
import cases from "../../../assets/lists/Cases";
import AssignTask from "../../../components/AssignTask/AssignTask";
import ExtendedTranslator from "./ExtendedTranslator";

export default ({ onChange, updateTranslator, role, onboard, i, show }) => {
  return (
    <React.Fragment key={onboard.first_name + onboard.last_name + " " + i}>
      <tr style={{ cursor: "pointer" }}>
        <td onClick={onChange}>
          {onboard.first_name} {onboard.last_name} (3)
        </td>
        <td onClick={onChange}>
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
        <td onClick={onChange}>{formatDate(onboard.date_accepted)}</td>
        <td onClick={onChange}>{formatDate(onboard.date_accepted)}</td>
        <td onClick={onChange}>4/5</td>
        <td onClick={onChange}>
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
        <td onClick={onChange}>{onboard.notes}</td>
        <td>
          <AssignTask
            first_name={onboard.first_name}
            last_name={onboard.last_name}
            task_in_progress={5}
            languages={onboard.languages}
            tasks={cases}
          />
        </td>
      </tr>
      <tr
        style={{
          display: show ? "" : "none",
          borderTop: "none",
        }}
      >
        <td colSpan={8}>
          <ExtendedTranslator
            updateTranslator={updateTranslator}
            role={role}
            onboard={onboard}
            i={i}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};
