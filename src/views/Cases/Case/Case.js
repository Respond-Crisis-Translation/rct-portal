import React from "react";
import ExtendedCase from "./ExtendedCase";
import formatDate from "../../../assets/helpers/formatDate";
import lang_short from "../../../assets/lists/langShort";
import AssignTranslator from "../../../components/AssignTranslator/AssignTranslator";

export default ({ onChange, loadCases, onboard, show, i }) => {
  return (
    <React.Fragment key={onboard.first_name + onboard.last_name + " " + i}>
      <tr
        onClick={onChange}
        style={
          show
            ? {
                borderLeft: "1px solid #e0e0e0",
                borderRight: "1px solid #e0e0e0",
                cursor: "pointer",
              }
            : { cursor: "pointer" }
        }
      >
        <td>
          <span className="uk-label">
            {lang_short[onboard.fromLanguage]} &#9658;{" "}
            {lang_short[onboard.toLanguage]}
          </span>
        </td>
        <td>
          {onboard.first_name} {onboard.last_name}
        </td>
        <td>{onboard.source}</td>
        <td>{onboard.case_number}</td>
        <td>{formatDate(onboard.due_date)}</td>
        <td>{onboard.status}</td>
        <td>{onboard.project_manager}</td>
        <td>
          {onboard.translator.first_name} {onboard.translator.last_name}
        </td>
        <td>
          <AssignTranslator case_id={onboard.id} loadCases={loadCases}/>
        </td>
      </tr>
      <tr
        style={{
          display: show ? "" : "none",
          borderTop: "none",
          borderLeft: "1px solid #e0e0e0",
          borderRight: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <td></td>
        <td colSpan={7}>
          <ExtendedCase onboard={onboard} />
        </td>
      </tr>
    </React.Fragment>
  );
};
