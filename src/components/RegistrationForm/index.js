// Write your JS code here
import {Component} from 'react'
import './index.css'

export default class RegistrationForm extends Component {
  state = {
    errors: {firstName: false, lastName: false},
    submitSuccess: false,
    firstName: '',
    lastName: '',
  }

  submitForm = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state

    if (firstName.trim() === '' && lastName.trim() === '') {
      this.setState({
        errors: {
          firstName: true,
          lastName: true,
        },
      })
    } else if (firstName.trim() === '') {
      this.setState({
        errors: {
          firstName: true,
          lastName: false,
        },
      })
    } else if (lastName.trim() === '') {
      this.setState({
        errors: {
          firstName: false,
          lastName: true,
        },
      })
    } else this.setState({submitSuccess: true})
  }

  onInputChange = event => {
    const {errors} = this.state
    const {name, value} = event.target

    this.setState({
      [name]: value,
      errors: {...errors, [name]: false},
    })
  }

  handleBlur = event => {
    const {errors} = this.state
    const {name, value} = event.target

    if (!value) {
      this.setState({errors: {...errors, [name]: true}})
    }
  }

  resetForm = () => {
    this.setState({
      firstName: '',
      lastName: '',
      errors: {firstName: false, lastName: false},
      submitSuccess: false,
    })
  }

  renderFirstNameField = () => {
    const {firstName, errors} = this.state
    return (
      <>
        <label htmlFor="first-name">FIRST NAME</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="First name"
          className={errors.firstName === true ? 'input-error' : ''}
          value={firstName}
          onChange={this.onInputChange}
          onBlur={this.handleBlur}
        />
        {errors.firstName && <p className="error-msg">*Required</p>}
      </>
    )
  }

  renderLastNameField = () => {
    const {lastName, errors} = this.state

    return (
      <>
        <label htmlFor="last-name">LAST NAME</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Last name"
          className={errors.lastName ? 'input-error' : ''}
          value={lastName}
          onChange={this.onInputChange}
          onBlur={this.handleBlur}
        />
        {errors.lastName && <p className="error-msg">Required</p>}
      </>
    )
  }

  render() {
    const {submitSuccess} = this.state

    if (submitSuccess) {
      return (
        <div className="success-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
            alt="success"
          />
          <p>Submitted Successfully</p>
          <button
            type="button"
            className="re-submit-btn"
            onClick={this.resetForm}
          >
            Submit Another Response
          </button>
        </div>
      )
    }

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-field">{this.renderFirstNameField()}</div>
        <div className="input-field">{this.renderLastNameField()}</div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }
}
