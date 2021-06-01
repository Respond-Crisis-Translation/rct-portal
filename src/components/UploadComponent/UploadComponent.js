import React from "react";
import Dropzone from "react-dropzone";
import * as DocumentService from "../../services/DocumentService";
import { fs } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Line } from "rc-progress";

import firebase from "firebase/app";
import "./UploadComponent.css";

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.undoComplete = this.undoComplete.bind(this);
    this.state = {
      files: [],
      progress: 0,
      disableUpload: false,
      document: this.props.document,
    };
  }

  onDrop = (files) => {
    this.setState({ files });
  };

  clearFiles = () => {
    this.setState({ files: [], disableUpload: false });
  };

  undoComplete = () => {
    const { document } = this.state;
    DocumentService.undoComplete(document.id).then(
      (res) => {
        console.log(res);
        const updatedDoc = { ...this.state.document };
        updatedDoc.translated_document_link = "";
        updatedDoc.translated_document_type = "";
        this.setState({
          document: updatedDoc,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  handleUpload(e) {
    e.preventDefault();
    const file = this.state.files[0];
    const caseId = this.props.caseId;
    const { document } = this.state;
    console.log(document);
    if (file == null) return;
    console.log(file);

    var filePath =
      caseId + "/" + file.lastModified + "_" + file.name.replaceAll(" ", "-");
    // 1. Upload file
    var uploadTask = fs.ref(filePath).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        this.setState({ progress });
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
        this.setState({ disableUpload: true });
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
              const updatedDoc = { ...this.state.document };
              updatedDoc.translated_document_link = downloadURL;
              this.setState({
                document: updatedDoc,
              });
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
    // Displays list of selected document (before uploading)
    const files = this.state.files.map((file) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
        <span className="selected_document_list" onClick={this.clearFiles}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </li>
    ));

    const { document } = this.state;

    return (
      <>
        <td colSpan={5}>
          {/* Preview Document */}
          <iframe
            id={`frame-${this.props.index}`}
            title={document.name}
            alt="Original Document"
            src={document.file_link}
            style={{ border: "0" }}
          />

          {/* List of Uploaded Document */}
          <p>
            <b>Uploaded Document</b>
          </p>
          {document.translated_document_link ? (
            <div>
              <p>
                <a
                  href={document.translated_document_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {document.name}
                </a>
              </p>
              <iframe
                id={`frame-${this.props.index}`}
                title={document.name}
                alt="Translated Document"
                src={document.translated_document_link}
                style={{ border: "0" }}
              />
            </div>
          ) : (
            <p>-</p>
          )}

          {/* Upload section */}
          <div className="uk-clearfix">
            <div className="">
              {document.translated_document_link ? (
                <>
                  <div className="upload-button-container">
                    <button
                      className="uk-button uk-button-primary"
                      style={{ marginRight: "5px" }}
                    >
                      View Certification
                    </button>
                    <button
                      className="uk-button uk-button-primary"
                      onClick={this.undoComplete}
                    >
                      Undo Complete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section className="container">
                        {this.state.files.length ? (
                          <div className="dropzone">
                            <p>
                              <b>Selected Document</b>
                            </p>
                            <aside>
                              <ul style={{ listStyleType: "none" }}>{files}</ul>
                            </aside>
                            <Line
                              percent={this.state.progress}
                              strokeWidth="1"
                              strokeColor="#8d8e8f"
                              strokeLinecap="square"
                            />
                          </div>
                        ) : (
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <div className="dropzone-drag-option">
                              Drag files here
                            </div>
                            <div className="dropzone-select-option">
                              Select files from you device
                            </div>
                          </div>
                        )}
                      </section>
                    )}
                  </Dropzone>

                  {/* Upload Button Container */}
                  <div className="upload-button-container">
                    <button
                      className="uk-button uk-button-primary"
                      style={{ marginRight: "5px", marginTop: "5px" }}
                      onClick={this.handleUpload}
                      disabled={this.state.disableUpload}
                    >
                      Upload
                    </button>
                  </div>

                  {document.translated_document_link ? (
                    <button
                      className="uk-button uk-button-default"
                      style={{ marginRight: "5px" }}
                    >
                      Complete Task
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </td>
      </>
    );
  }
}

export default UploadComponent;
