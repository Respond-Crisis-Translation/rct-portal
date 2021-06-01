import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Organizations from "../../assets/lists/knownOrganizations";

class AddCaseModalForm extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    duedate: "",
    organization: "",
    pocName: "",
    pocInfo: "",
    pageCount: 0,
    docDescription: "",
    sensitiveContents: false,
  };

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

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Case info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Form.File id="documents" label="Upload documents" multiple />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() =>
              this.props.handleSubmit(
                this.state.firstname,
                this.state.lastname,
                this.state.duedate,
                this.state.organization,
                this.state.pocName,
                this.state.pocInfo,
                this.state.pageCount,
                this.state.docDescription,
                this.state.sensitiveContents,
                this.state.documents
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
