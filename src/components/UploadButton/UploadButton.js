import React from 'react';
import * as CaseService from "../../services/CaseService";

class UploadButton extends React.Component {

  render() {
    return (
      <>
      <form onSubmit={CaseService.uploadCaseDocument()}>
        <input type="file" onChange= />
        <button action="uploadCaseDocument(file)">GO UPLOAD</button>
      </form>
      </>
    );
  }
}

export default UploadButton;
