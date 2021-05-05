import React from "react";
import "./Translators.css";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as TranslatorService from "../../services/TranslatorService";
import Translator from "./Translator/Translator";

export default class Translators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      role: null,
      translators: [],
    };
    this.onChange = this.onChange.bind(this);
    this.updateTranslator = this.updateTranslator.bind(this);
  }

  onChange(values) {
    this.setState(values);
  }

  componentDidMount() {
    this.loadTranslators();

    auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      const role = idTokenResult.claims.role;
      this.setState({ role: role });
    });
  }

  loadTranslators() {
    TranslatorService.getTranslators("APPROVED").then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      this.setState({ translators: data });
    });
  }

  updateTranslator(translatorId, role) {
    TranslatorService.updateRole(translatorId, role).then(
      () => {
        // show pop up with success
        // `Successfully applied ${role} role for the translator.`
        this.loadTranslators();
      },
      (err) => {
        // show pop up with failure
        console.log(err);
      }
    );
  }

  render() {
    const { translators } = this.state;
    return (
      <>
        <Sidebar active="translators" />
        <div className="tm-main uk-section uk-section-default">
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
                  <th>Translator Name (task in progress)</th>
                  <th>Language(s)</th>
                  <th>Date Joined</th>
                  <th>Last Login</th>
                  <th>Completed/Total</th>
                  <th>Specialty</th>
                  <th>Notes</th>
                  <th>Assign Task</th>
                </tr>
              </thead>
              <tbody>
                {translators?.map((onboard, i) => (
                  <Translator
                    onChange={() =>
                      this.setState({ show: this.state.show === i ? null : i })
                    }
                    updateTranslator={this.updateTranslator}
                    role={this.state.role}
                    show={this.state.show === i}
                    onboard={onboard}
                    key={i + "_translator"}
                    i={i}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
