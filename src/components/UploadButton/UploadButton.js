import React from "react";
import * as DocumentService from "../../services/DocumentService";
import { fs } from "../../firebase";
import firebase from "firebase/app";

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e) {
    const file = e.target.files[0];
    const document = this.props.document;
    console.log(document);
    if (file == null) return;
    console.log(file);

    var filePath =
      document.case_id +
      "/" +
      file.lastModified +
      "_" +
      file.name.replace(" ", "-");
    // 1. Upload file
    var uploadTask = fs.ref(filePath).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("Success");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("unauthorized");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("canceled");
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            console.log("unknown");
            break;
          default:
            console.log("success");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);

          DocumentService.updateDocument(
            document.id,
            downloadURL,
            file.type
          ).then(
            (res) => {
              console.log("uploaded successfully", res);
            },
            (err) => {
              console.log("Error loading", err);
            }
          );
        });
      }
    );
  }

  render() {
    return (
      <>
        <input
          className="uk-button uk-button-primary"
          type="file"
          onChange={this.handleUpload}
        />
        {/* <button className="uk-button uk-button-primary">
                                    Upload
                                    </button> */}
      </>
    );
  }
}

export default UploadButton;
