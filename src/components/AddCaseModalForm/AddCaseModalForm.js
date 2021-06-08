import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
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
  handleSensitiveContentPresent = () =>
    this.setState({ sensitiveContents: true });
  handleSensitiveContentAbsent = () =>
    this.setState({ sensitiveContents: false });
  onDrop = (files) => this.setState({documents: files});

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
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Case info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
            <Form.Label>From Language</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleFromLang}
              placeholder=""
            >
              {Languages.map((lang, key) => (
                <option value={lang} key={key}>
                  {lang}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>To Languages</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleToLang}
              placeholder=""
            >
              {Languages.map((lang, key) => (
                <option value={lang} key={key}>
                  {lang}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Client's first name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleFirstname}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Client's last name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleLastname}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Case due date</Form.Label>
            <Form.Control
              type="date"
              onChange={this.handleDuedate}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Organization</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleOrganization}
              placeholder=""
            >
              <option defaultValue="">---</option>
              {Organizations.map((organization, key) => (
                <option value={organization} key={key}>
                  {organization}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Point of contact at organization</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handlePocName}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Point of contact info</Form.Label>
            <Form.Control
              type="email"
              onChange={this.handlePocInfo}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Page count</Form.Label>
            <Form.Control
              type="number"
              onChange={this.handlePageCount}
              placeholder=""
              min="0"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Document description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={this.handleDocDescription}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            Sensitive contents (including graphic description, images, etc.)
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                type="radio"
                label="Yes"
                name="formRadios"
                id={`inline-radio-1`}
                onChange={this.handleSensitiveContentPresent}
              />
              <Form.Check
                type="radio"
                label="No"
                name="formRadios"
                id={`inline-radio-2`}
                onChange={this.handleSensitiveContentAbsent}
              />
            </div>
          </Form.Group>
          <Form.Group>
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
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
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
