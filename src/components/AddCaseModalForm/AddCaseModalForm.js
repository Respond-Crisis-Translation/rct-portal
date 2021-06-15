import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropzone from 'react-dropzone';

import Organizations from "../../assets/lists/knownOrganizations";
import Languages from "../../assets/lists/supportLangauges";
import "./AddCaseModalForm.css";

import { auth } from "../../firebase";

class AddCaseModalForm extends React.Component {
  state = {
    fromLang: "",
    toLang: "",
    firstname: "",
    lastname: "",
    duedate: "",
    organization: "",
    pocName: "",
    pocInfo: "",
    pageCount: 0,
    docDescription: "",
    sensitiveContents: false,
    documents: [],
    currentUser: null,
  };


  handleFromLang = (e) => this.setState({ fromLang: e.target.value });
  handleToLang = (e) => this.setState({ toLang: e.target.value });
  handleFirstname = (e) => this.setState({ firstname: e.target.value });
  handleLastname = (e) => this.setState({ lastname: e.target.value });
  handleDuedate = (e) => this.setState({ duedate: e.target.value });
  handleOrganization = (e) => this.setState({ organization: e.target.value });
  handlePocName = (e) => this.setState({ pocName: e.target.value });
  handlePocInfo = (e) => this.setState({ pocInfo: e.target.value });
  handlePageCount = (e) => this.setState({ pageCount: e.target.value });
  handleDocDescription = (e) =>
    this.setState({ docDescription: e.target.value });
  handleSensitiveContent = (e) =>
    this.setState({ sensitiveContents: (e.target.value === "yes") ? true : false });
  onDrop = (files) => this.setState({documents: files});
  handleClear = () => this.setState({
    firstname: "",
    lastname: "",
    duedate: "",
    organization: "",
    pocName: "",
    pocInfo: "",
    pageCount: 0,
    docDescription: "",
    sensitiveContents: false,
    documents: []
  });

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        this.setState({ currentUser: user });
      }
    });
  }

  render() {
    const files = this.state.documents.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Case info</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form>
            <div className="uk-grid" uk-grid>
              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card" >Client's first name</label>
                <div className="uk-form-controls uk-card">
                    <input className="uk-input" type="text" placeholder="John" value={this.state.firstname} onChange={this.handleFirstname}/>
                </div>
              </div>

              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card">Client's last name</label>
                <div className="uk-form-controls uk-card">
                    <input className="uk-input" type="text" placeholder="Doe" value={this.state.lastname} onChange={this.handleLastname}/>
                </div>
              </div>
            </div>
              
            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card">Case due date</label>
                <div className="uk-form-controls uk-card">
                    <input className="uk-input" type="date" value={this.state.duedate} onChange={this.handleDuedate}/>
                </div>
              </div>
            </div>
            
            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card">Organisation</label>
                <div className="uk-form-controls uk-card">
                  <select className="uk-select" onChange={this.handleOrganization} value={this.state.organization}>
                    <option defaultValue="">---</option>
                    {Organizations.map((organization, key) => (
                      <option value={organization} key={key}>
                        {organization}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card" >Point of contact at organization</label>
                <div className="uk-form-controls uk-card">
                    <input className="uk-input" type="text" placeholder="John Doe" value={this.state.pocName} onChange={this.handlePocName}/>
                </div>
              </div>

              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card">Point of contact info</label>
                <div className="uk-form-controls uk-card">
                    <input className="uk-input" type="text" placeholder="johndoe@email.com" value={this.state.pocInfo} onChange={this.handlePocInfo}/>
                </div>
              </div>
            </div>

            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-3@s">
                <label className="uk-form-label uk-card">Page Count</label>
                <div className="uk-form-controls uk-card">
                    <input className="uk-input" type="number" value={this.state.pageCount} onChange={this.handlePageCount}/>
                </div>
              </div>
            </div>

            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-1@s">
                <label className="uk-form-label uk-card">Document description</label>
                <div className="uk-form-controls uk-card">
                  <textarea className="uk-textarea" rows="3" placeholder="Document description" value={this.state.docDescription} onChange={this.handleDocDescription}></textarea>
                </div>
              </div>
            </div>

            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-1@s">
                <label className="uk-form-label uk-card">Sensitive contents (including graphic description, images, etc.)</label>
                <div className="uk-form-controls uk-card">
                  <label><input className="uk-radio" type="radio" name="formRadios" checked={this.state.sensitiveContents} value="yes" onChange={this.handleSensitiveContent}/> Yes</label><br />
                  <label><input className="uk-radio" type="radio" name="formRadios" checked={!this.state.sensitiveContents} value="no" onChange={this.handleSensitiveContent}/> No</label>
                </div>
              </div>
            </div>
            
            <div className="uk-grid no_top_margin" uk-grid>
              <div className="uk-margin-bottom uk-width-1-1@s">
                <Dropzone onDrop={this.onDrop}>
                  {({getRootProps, getInputProps}) => (
                    <section className="container">
                      <h6>Documents:</h6>
                      <ul>{files}</ul>
                      <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>{(this.state.documents.length === 0) ? 'Upload Documents' : 'Reupload Documents'}</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>

          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={this.handleClear}
          >
            Delete this case
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() =>
              this.props.handleSubmit(
                {
                  fromLanguage: this.state.fromLang,
                  toLanguage: this.state.toLang,
                  case_number: new Date().getTime(),
                  contact: this.state.pocName,
                  email: this.state.pocInfo,
                  due_date: new Date(this.state.duedate),
                  first_name: this.state.firstname,
                  last_name: this.state.lastname,
                  source: this.state.organization,
                  note: this.state.docDescription,
                  page_count: this.state.pageCount,
                  status: "New",
                  project_manager: this.state.currentUser.displayName,
                  project_manager_uid: this.state.currentUser.uid,
                },
                this.state.documents,
              )
            }
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddCaseModalForm;
