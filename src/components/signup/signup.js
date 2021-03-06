import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { withRouter } from 'react-router-dom';
import './signup.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      firstNameValid: false,
      lastNameValid: false,      
      emailValid: false,
      passwordValid: false,
      formValid: false,
      formErrors: { email: '', password: '', firstName: '', lastName: '' },
    };
  }

  componentDidUpdate() {
    const { UserData, loading } = this.props;
    const { status } = UserData;
    if (status !== undefined && loading == false) {
      const { msg, Data } = UserData;
      if (status === 201) {
        this.redirectToDashboard(Data);
      }else{
        this.props.notify(msg);
        this.props.clearUserData();
      }
    }
  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  redirectToDashboard = (Data) => {
    localStorage.clear();
    this.props.notify("signup successful now signin");
    {this.props.signUpCloseModal()}
   {this.props.signInModal()}
  };


  validateField = (fieldName, value) => {
    const { formErrors } = this.state;
    let { emailValid, passwordValid, lastNameValid, firstNameValid } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
        formErrors.email = emailValid ? null : ' email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 5;
        formErrors.password = passwordValid ? null : ' password is too short';
        break;
      case 'firstName': 
        firstNameValid = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/.test(value);
        formErrors.firstName= firstNameValid ? null : 'firstName is not valid';
      break;
      case 'lastName': 
        lastNameValid = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/.test(value);
        formErrors.lastName= lastNameValid ? null : 'lastName is not valid';
      default:
        break;
    }
    this.setState({
      formErrors,
      firstNameValid,
      lastNameValid,  
      emailValid,
      passwordValid,
      formValid: emailValid && passwordValid && lastNameValid && firstNameValid
    });
  }

  blurHandler = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
    this.validateField(name, value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.formValid) return; 
    const {firstName, lastName, email, password } = this.state;
    this.props.sigupUser({firstName, lastName, email, password, isAdmin: false, Type: "client" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="signup__form">
        <div className="form-group">
          <input
       className="Input"
        type="text"
        id="firstName"
        color="purple darken-3"
        placeholder="firstName"
        value={this.state.firstName}
        onChange={this.myChangeHandler}
        onBlur={this.blurHandler}
        autoComplete="off"
        required
      />
       <div className="indicator">{this.state.formErrors.firstName === null ? null : this.state.formErrors.firstName}</div>
        </div>
        <div className="form-group">
          <input
       className="Input"
        type="text"
        id="lastName"
        placeholder="lastName"
        color="purple darken-3"
        value={this.state.lastName}
        onChange={this.myChangeHandler}
        onBlur={this.blurHandler}
        autoComplete="off"
        required
      />
      <div className="indicator">{this.state.formErrors.lastName === null ? null : this.state.formErrors.lastName}</div>
        </div>
        <div className="form-group">
          <input
       className="Input"
        type="email"
        id="email"
        color="purple darken-3"
        placeholder="email"
        value={this.state.email}
        onChange={this.myChangeHandler}
        onBlur={this.blurHandler}
        autoComplete="off"
        required
      />
      <div className="indicator">{this.state.formErrors.email === null ? null : this.state.formErrors.email}</div>
        </div>
        <div className="form-group">
          <input
       className="Input"
        type="password"
        id="password"
        placeholder="password"
        color="purple darken-3"
        value={this.state.password}
        onChange={this.myChangeHandler}
        onBlur={this.blurHandler}
        autoComplete="off"
        required
      />
      <div className="indicator">{this.state.formErrors.password === null ? null : this.state.formErrors.password}</div>
        </div>
        <div className="form-group form-group--submit">   
        <button  onClick={this.handleSubmit} className="button submit-button" type="submit">
          { this.props.loading ? (
          <SyncLoader
          sizeUnit="px"
          size={15}
          color="#ffff"
          loading={this.props.loading}
        />
            )
            : 'Sign Up'
        }
        </button>
        </div>
      </form>
    );
  }
}
export default withRouter(SignUp);
