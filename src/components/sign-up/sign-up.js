import React from 'react';
import CustomButton from '../custom-button/custom-button';
import FormInput from '../form-input/form-input';
import './sign-up.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase-utils';

class SignUp extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if(password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch(error) {
      console.log('There was an error during registration: ', error)
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  render() { 
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput 
            handleChange={this.handleChange}
            label='Name' 
            name='displayName' 
            type='text' 
            value={displayName} 
            required 
          />
          <FormInput 
            handleChange={this.handleChange}
            label='Email' 
            name='email' 
            type='email' 
            value={email} 
            required 
          />
          <FormInput 
            handleChange={this.handleChange}
            label='Password' 
            name='password' 
            type='password' 
            value={password} 
            required 
          />
          <FormInput 
            handleChange={this.handleChange}
            label='Confirm Password' 
            name='confirmPassword' 
            type='password' 
            value={confirmPassword} 
            required 
          />
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}
 
export default SignUp;