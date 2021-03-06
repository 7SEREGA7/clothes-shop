import React from 'react';
import CustomButton from '../custom-button/custom-button';
import FormInput from '../form-input/form-input';
import './sign-in.scss';
import { signInWithGoogle } from '../../firebase/firebase-utils';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      email: '',
      password: ''
    })
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  render() { 
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            handleChange={this.handleChange}
            label='Email' 
            name='email' 
            type='email' 
            value={this.state.email} 
            required 
          />
          <FormInput 
            handleChange={this.handleChange}
            label='Password' 
            name='password' 
            type='password' 
            value={this.state.password} 
            required 
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton isGoogleSignIn onClick={ signInWithGoogle }>Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;