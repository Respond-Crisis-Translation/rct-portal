import React from "react";
import "./Application.css";
import firebase from "firebase/app";
import AppQuestions from "../../assets/lists/Application";
import ApplicationPage from "../../components/ApplicationPage/ApplicationPage";
import Languages from "../../assets/lists/supportLangauges";
import Experience from "../../assets/lists/experienceLevel";
import { db } from "../../firebase";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProgress: 0,
      answers: {
        first_name: "",
        last_name: "",
        email: "",
        about: "",
      },
      languages: {},
    };

    this.advance = this.advance.bind(this);
    this.previous = this.previous.bind(this);
    this.onChange = this.onChange.bind(this);
    this.prevRecur = this.prevRecur.bind(this);
  }

  componentDidMount() {
    document
      .getElementById("ProgressBar")
      .children[0].classList.add("is-current");
    const { languages } = this.state;
    const expi = {};
    Experience.forEach((exp) => {
      expi[exp["skill"]] = exp;
      expi[exp["skill"]]["checked"] = false;
    });
    Languages.forEach((language) => {
      languages[language] = {
        checked: false,
        toEnglish: false,
        fromEnglish: false,
        toTranslation: "",
        fromTranslation: "",
        oral: undefined,
        language,
        experience: JSON.parse(JSON.stringify(expi)),
      };
    });
    this.setState({ languages });
  }

  convertToFireStoreDocument(values) {
    const newValues = {
      first_name: values.answers.first_name,
      last_name: values.answers.last_name,
      email: values.answers.email,
      about: values.answers.about,
      found_us: values.answers.find_us,
      support: values.answers.support,
    };

    newValues.languages = [];

    for (const language in values.languages) {
      if (values.languages[language].checked) {
        delete values.languages[language].checked;

        const experiences = Object.values(
          values.languages[language].experience
        ).map((exp) => exp.skill);
        const temp = experiences.filter(
          (a) => values.languages[language].experience[a].checked
        );
        values.languages[language].experience = temp;
        newValues.languages.push(values.languages[language]);
      }
    }

    newValues.date_submitted = firebase.firestore.Timestamp.now();
    return newValues;
  }

  sendToDB(values) {
    const translator = this.convertToFireStoreDocument(values);
    db.collection("translators")
      .add(translator)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  onChange(values) {
    this.setState(values);
  }

  prevRecur(time) {
    const { currentProgress } = this.state;
    let moveBack = currentProgress - time;
    while (moveBack > 0) {
      this.previous();
      moveBack -= 1;
    }
  }

  advance() {
    const bar = document.getElementById("ProgressBar");
    const currentChild = bar.querySelector(".is-current");

    if (currentChild) {
      const currentId = parseInt(bar.querySelector(".is-current").id, 10);
      currentChild.classList.add("is-complete");
      currentChild.classList.remove("is-current");
      if (currentId + 1 < bar.children.length) {
        bar.children[currentId + 1].classList.add("is-current");
        this.setState({ currentProgress: currentId + 1 });
      }
    } else {
      bar.children[0].classList.add("is-current");
      this.setState({ currentProgress: 0 });
    }

    if (parseInt(currentChild.id, 10) === 4) {
      console.log(this.state);
      this.sendToDB(this.state);
    }
  }

  previous() {
    const { currentProgress } = this.state;
    const bar = document.getElementById("ProgressBar");
    const currentChild = bar.querySelector(".is-current");
    if (currentChild && currentChild.children.length > 0) {
      const currentId = parseInt(bar.querySelector(".is-current").id, 10);
      if (currentId - 1 > -1) {
        bar.children[currentId - 1].classList.remove("is-complete");
        bar.children[currentId].classList.remove("is-current");
        bar.children[currentId - 1].classList.add("is-current");
        this.setState({ currentProgress: currentId - 1 });
      }
    } else {
      const child = bar.querySelectorAll(".is-complete");
      if (child && child.length > 0) {
        child[currentProgress].classList.add("is-current");
        child[currentProgress].classList.remove("is-complete");
        this.setState({ currentProgress: currentProgress - 1 });
      }
    }
  }

  render() {
    const { currentProgress, answers, languages } = this.state;
    return (
      <div className="uk-margin-large-left">
        <ol id="ProgressBar">
          {AppQuestions.map((question, index) => (
            <li
              key={question.header}
              id={index}
              className="ProgressBar-step"
              style={question.allowRetry ? { cursor: "pointer" } : {}}
              onClick={
                question.allowRetry ? () => this.prevRecur(index) : () => {}
              }
            >
              <svg className="ProgressBar-icon">
                <use xlinkHref="#checkmark-bold" />
              </svg>
              <span className="ProgressBar-stepLabel">{question.header}</span>
            </li>
          ))}
        </ol>
        <div className="uk-container">
          <ApplicationPage
            currentProgress={currentProgress}
            onChange={this.onChange}
            advance={this.advance}
            previous={this.previous}
            answers={answers}
            languages={languages}
          />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="checkmark-bold" viewBox="0 0 24 24">
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </symbol>
        </svg>
      </div>
    );
  }
}
