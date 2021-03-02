import React from 'react';
import Logo from '../../assets/images/Respond_Logo_icon_fullcolor.png'
import Footer from "../../components/Footer/Footer"
import './ForgotPassword.css';

export default class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        // The passwords here will be viewable by "Inspect element", but this is
        // not a privacy concern as it will only be the user's own passwords.
        this.state = {
          email: "",
          error: "",
        }

        this.updateEmail = this.updateEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
      }

    componentDidMount() {}

    updateEmail(e) {
      this.setState({email: e.target.value})
    }

    getErrorMessage() {
    if (this.state.error !== "") {
      return (
        <div>
          <p className="ErrorMessage"> {this.state.error} </p>
        </div> 
        )
    } else {
      return (
        <div>
        </div>
        )
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // Call BE API endopint for /forgotpasssword. Set error with code below.
        // .catch((err) => {
        //   this.setState({error: err});
        //   console.log(err);
        // });
    }

    render() {
      let errorMessage = this.getErrorMessage();
        return (
          <div className="ForgotPassword">
            <div className="UserInformation"> 
            <img className="Logo" src={Logo} width={50} height={50} alt="Respond Crisis Translation Logo"/>
            <br/>
            <br/>

            <h4>Retrieve password</h4>
            <h5>Type in your registered email address and click Send.</h5>
            <form onSubmit={this.handleSubmit}>
              <label>
                Email:
                <br/>
                <input type="email" name="email_account" onChange={this.updateEmail} placeholder="your email address here" />
              </label>
              <br/>
              <br/>
              <input type="submit" value="Send" />
            </form>
            <br />
            {errorMessage} 
            <h5>We will send a link to your email address with instructions to reset your password.</h5>
            </div>
            <Footer/>
          </div>
          )
    }
}
