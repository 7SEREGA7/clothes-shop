import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import Shop from './pages/shop/shop';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';

class App extends React.Component {
  
  state = {
    currentUser: null
  }

  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      } else {
        this.setState({ currentUser: userAuth });
      }      
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/signin' element={<SignInSignUpPage/>} />
        </Routes>
      </div>
    );
  }
}

export default App;