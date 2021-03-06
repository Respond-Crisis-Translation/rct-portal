import React from "react";
import formatDate from "../../assets/helpers/formatDate";
import lang_short from "../../assets/lists/langShort";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as CaseService from "../../services/CaseService";
import AddCaseModalForm from "../../components/AddCaseModalForm/AddCaseModalForm";
import * as DocumentService from "../../services/DocumentService";
import Organizations from "../../assets/lists/knownOrganizations";
import "./Cases.css";
import { auth } from "../../firebase";
import { fs } from "../../firebase";
import AssignTranslator from "../../components/AssignTranslator/AssignTranslator";
import firebase from "firebase/app";

export default class Cases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      currentUser: null,
      cases: [],
      isOpen: false,
      languages: ["Spanish to English", "English to Spanish"],
      selectedLanguage: "",
      organizations: Organizations,
      selectedOrganization: "",
      searchText: "",
      documents: [],
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  handleSubmit(newCase, documents) {
    console.log(documents);
    if (!documents || documents.length === 0) {
      console.log("Select documents to upload");
      return;
    }
    console.log(newCase);
    this.setState({ isOpen: false });
    CaseService.createCase(newCase)
      .then((documentRef) => {
        console.log(documentRef);
        const caseId = documentRef.id;
        // upload doc for the case
        this.uploadFiles(documents, caseId);
      })
      .catch(() => this.setState({ errorCode: "create-list-error" }));
  }

  componentDidMount() {
    this.getAllCases();
    auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        this.setState({ currentUser: user });
      }
    });
  }

  uploadFiles = (files, caseId) => {
    files.forEach((file) => {
      if (file == null) return;

      var filePath =
        caseId + "/" + file.lastModified + "_" + file.name.replaceAll(" ", "-");
      // 1. Upload file
      var uploadTask = fs.ref(filePath).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);

            const document = {
              case_id: caseId,
              file_link: downloadURL,
              file_type: file.type,
              name: file.name,
            };
            console.log(document);
            // create document
            DocumentService.createDocument(document).then(
              (res) => {
                console.log("uploaded successfully", res);
                this.getAllCases();
              },
              (err) => {
                console.log("Error loading", err);
              }
            );
          });
        }
      );
    });
  };

  getAllCases = () => {
    CaseService.getAllCases()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        console.log(data);
        this.setState({ cases: data });
      })
      .catch(() => this.setState({ errorCode: "create-list-error" }));
  };

  getCases = (field, value) => {
    CaseService.getCases(field, value)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        this.setState({ cases: data });
        console.log(data);
      })
      .catch(() => this.setState({ errorCode: "create-list-error" }));
  };

  handleOrganisationChange = (e) => {
    e.preventDefault();
    const org = e.target.value;
    this.setState({ selectedOrganization: org });
    if (org === "All Organizations") {
      this.getAllCases();
    } else {
      this.getCases("source", org);
    }
  };

  handleLanguageChange = (e) => {
    e.preventDefault();
    const lang = e.target.value;
    this.setState({ selectedLanguage: lang });

    if (lang === "All Languages") {
      this.getAllCases();
      return;
    }
    const toFrom = lang.split(" to ");
    CaseService.getCasesByLang(toFrom[0], toFrom[1])
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        this.setState({ cases: data });
        console.log(data);
      })
      .catch(() => this.setState({ errorCode: "create-list-error" }));
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { searchText } = this.state;
    console.log(searchText);
    if (searchText) {
      const caseNumber = parseInt(searchText);
      this.getCases("case_number", caseNumber);
    } else {
      this.getAllCases();
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { cases } = this.state;
    return (
      <>
        <ErrorMessage errorCode={this.state.errorCode}></ErrorMessage>
        <Sidebar
          active="cases"
          user_type={this.props.user_type ? "admin" : "all"}
          first_name={this.props.first_name}
          last_name={this.props.last_name}
        />

        <div className="tm-main uk-section uk-section-default">
          {/* Cases filter menu */}
          <div className="uk-container uk-position-relative FilterMainDiv">
            <div className="uk-inline OrganisationFilter">
              <select
                className="uk-select"
                value={this.state.selectedOrganization}
                onChange={this.handleOrganisationChange}
              >
                <option defaultValue="">All Organizations</option>
                {this.state.organizations.map((organization, key) => (
                  <option value={organization} key={key}>
                    {organization}
                  </option>
                ))}
              </select>
            </div>

            <div className="uk-inline SearchFilter">
              <button
                className="uk-form-icon uk-form-icon-flip"
                href="/"
                uk-icon="icon: search"
                onClick={this.handleSearch}
                aria-hidden="true"
              >
                {" "}
              </button>
              <input
                className="uk-input"
                type="text"
                placeholder="case number"
                value={this.state.searchText}
                onChange={this.handleSearchChange}
              />
            </div>

            <div className="uk-inline LanguageFilter">
              <select
                className="uk-select"
                value={this.state.selectedLanguage}
                onChange={this.handleLanguageChange}
              >
                <option defaultValue="">All Languages</option>
                {this.state.languages.map((language, key) => (
                  <option value={language} key={key}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            <div className="uk-inline AddCaseFilter">
              <button
                onClick={this.openModal}
                className="uk-button uk-button-default uk-button-large"
              >
                Add Cases
              </button>
            </div>
          </div>

          {/* Cases Table */}
          <div
            className="uk-container uk-position-relative uk-margin-remove"
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              marginRight: "0px",
            }}
          >
            {this.state.isOpen ? (
              <AddCaseModalForm
                closeModal={this.closeModal}
                isOpen={this.state.isOpen}
                handleSubmit={this.handleSubmit}
              />
            ) : null}
            <table className="uk-table uk-table-divider">
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Client</th>
                  <th>Sources</th>
                  <th>Case Number</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>PM</th>
                  <th>Translator</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((onboard, i) => (
                  <React.Fragment
                    key={onboard.first_name + onboard.last_name + " " + i}
                  >
                    <tr
                      onClick={() => {
                        this.setState({
                          show: this.state.show === i ? null : i,
                        });
                        DocumentService.getDocuments(onboard.id).then(
                          (snapshot) => {
                            const docs = [];
                            snapshot.forEach((doc) => docs.push(doc.data()));
                            this.setState({ documents: docs });
                          },
                          (err) => {
                            console.log(err);
                          }
                        );
                      }}
                      style={
                        this.state.show === i
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
                      {onboard.translator ? (
                        <td>
                          {onboard.translator.first_name}{" "}
                          {onboard.translator.last_name}
                        </td>
                      ) : (
                        <td>
                          <AssignTranslator currentCase={onboard} loadComp={this.componentDidMount}/>
                          {/* <button
                            className="uk-button  uk-button-primary uk-button-small uk-margin-small-right"
                            type="button"
                          >
                            Assign
                          </button> */}
                        </td>
                      )}
                    </tr>
                    <tr
                      style={{
                        display: this.state.show === i ? "" : "none",
                        borderTop: "none",
                        borderLeft: "1px solid #e0e0e0",
                        borderRight: "1px solid #e0e0e0",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <td></td>
                      <td colSpan={7}>
                        <div uk-grid="">
                          <div className="uk-width-auto">
                            <p>
                              <b>Contact</b>
                            </p>
                            <p>{onboard.email}</p>
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Contact at organization</b>
                            </p>
                            <p>{onboard.contact}</p>
                          </div>
                        </div>
                        <hr />
                        <table className="uk-table">
                          <thead>
                            <tr>
                              <th>Document Name</th>
                              <th>File Type</th>
                              <th>Download</th>
                              <th>Translation Upload</th>
                              <th>Certificate Download</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.documents.map((document, p) => (
                              <tr
                                key={`${document.name} ${p} ${document.file_type}`}
                              >
                                <td>{document.name}</td>
                                <td>{document.file_type}</td>
                                <td>
                                  <a
                                    href={document.file_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span uk-icon="icon: download"></span>
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href={document.translated_document_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span uk-icon="icon: download"></span>
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href={document.certificate_upload}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span uk-icon="icon: download"></span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <hr />
                        <p>
                          <b>Notes</b>
                        </p>
                        {onboard.note}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
