import React from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as CaseService from "../../services/CaseService";
import Case from "./Case/Case";
import "./Cases.css";

export default class Cases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      cases: [],
      languages: ["ES to EN", "ZH to EN", "EN to ES"],
      selectedLanguage: "",
      organizations: ["Organization 1", "Organization 2", "Organization 3"],
      selectedOrganization: "",
      searchText: "",
    };
  }

  componentDidMount() {
    CaseService.getAllCases()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        this.setState({ cases: data });
      })
      .catch(() => this.setState({ errorCode: "create-list-error" }));
  }

  handleOrganisationChange = (e) => {
    this.setState({ selectedOrganization: e.target.value });
  };

  handleLanguageChange = (e) => {
    this.setState({ selectedLanguage: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    // TODO: Search Functionality
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
              <a
                className="uk-form-icon uk-form-icon-flip"
                href="/"
                uk-icon="icon: search"
                onClick={this.handleSearch}
                aria-hidden="true"
              >
                {" "}
              </a>
              <input
                className="uk-input"
                type="text"
                placeholder="e.g. case number, name, notes etc"
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
              <button className="uk-button uk-button-default uk-button-large">
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
                  <Case
                    onChange={() =>
                      this.setState({ show: this.state.show === i ? null : i })
                    }
                    onboard={onboard}
                    show={this.state.show === i}
                    i={i}
                  ></Case>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
