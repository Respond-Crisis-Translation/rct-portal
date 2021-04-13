import React from 'react';

class UploadButton extends React.Component {

  render() {
    return (
        <input type="file" id="uploader">Upload Some docs</input>
        <button action="uploadCaseDocument()">GO UPLOAD</button>
    )
  }
}

export default UploadButton
