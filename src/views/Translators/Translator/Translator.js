import React from "react";
import formatDate from "../../../assets/helpers/formatDate";
import lang_short from "../../../assets/lists/langShort";
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
          {onboard.languages?.map((language, y) => (
            <span
              className="uk-label"
              key={
                onboard.first_name +
                onboard.last_name +
                language.from_langauge +
                language.to_langauge +
                " language(s) " +
                i +
                " " +
                y
              }
            >
              {lang_short[language.from_langauge]} &#9658;{" "}
              {lang_short[language.to_language]}
            </span>
          ))}
        </td>
        <td onClick={onChange}>{formatDate(onboard.date_accepted)}</td>
        <td onClick={onChange}>{formatDate(onboard.date_accepted)}</td>
        <td onClick={onChange}>4/5</td>
        <td onClick={onChange}>
          {onboard.specialities?.map((special, z) => (
            <span
              key={
                onboard.first_name +
                onboard.last_name +
                special +
                " " +
                i +
                " " +
                z
              }
            >
              {special},
            </span>
          ))}
        </td>
        <td onClick={onChange}>{onboard.notes}</td>
        <td>
          <AssignTask
            first_name={onboard.first_name}
            last_name={onboard.last_name}
            translator_id={onboard.id}
            task_in_progress={5}
            languages={onboard.languages}
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
