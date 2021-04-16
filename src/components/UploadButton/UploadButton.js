import React from 'react';
import * as CaseService from "../../services/CaseService";
import { auth, db, fs } from '../../firebase'

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   case: null,
    // };
    this.handleUpload = this.handleUpload.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  }

  handleUpload(e) {
    const file = e.target.files[0];
    const caseId = this.props.case;

    if (file == null) return;
    console.log(file);

    var filePath = auth.currentUser.uid + "/" + file.name;

    // 0. Get Case (Document in Firebase)
    console.log("Using CASEID: ", caseId);
    CaseService.getCase(caseId).then(caseRef => {

        // 1. Upload file
        var storageRef = fs.ref(filePath).put(file).then(storageSnapshot => {
          console.log("uploading file.");

          // 2. Update Case with file location
          return caseRef.update({
              documents: {
                date_completed: db.FieldValue.serverTimestamp(),
                file_link: storageSnapshot.metadata.fullPath,
                translated_document_link: storageSnapshot.metadata.fullPath,
              }
            });

        }).catch(error => {
            console.error("Error updating case record after document upload.");
          }
        );

    }).catch(error => {
      console.log("error getting case: ", error);
    });
  }

  render() {
    return (
      <>
        <input type="file" onChange={this.handleUpload} />
      </>
    );
  }
}

export default UploadButton;
