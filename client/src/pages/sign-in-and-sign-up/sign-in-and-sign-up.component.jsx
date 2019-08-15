import React, {useState} from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => {
  const [route, setRoute] = useState(true)
  return (
  <div className='sign-in-and-sign-up'>
    <div className="toggle">
      <h3 className={route ? 'colorize' : null} onClick={() => setRoute(true)}>Sign In</h3>
      <h3 className={route ? null : 'colorize'} onClick={() => setRoute(false)}>Sign Up</h3>
    </div>
    <div className="center">
      {
        route ? <SignIn /> : <SignUp />
      }  
    </div> 
  </div>
)};

export default SignInAndSignUpPage;
