import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

import PreLoader from './preloader';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './context/currentUser/CurrentUser.context';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component')) ;
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const Header = lazy(() => import('./components/header/header.component'));

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({ CurrentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }})
        });
      }

      this.setState({
        currentUser: userAuth
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Suspense fallback={<PreLoader />}>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <CurrentUserContext.Provider value={this.state.currentUser}>
              <Header />
            </CurrentUserContext.Provider>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route
                exact
                path='/signin'
                render={() =>
                  this.state.currentUser ? (
                    <Redirect to='/' />
                  ) : (
                    <SignInAndSignUpPage />
                  )
                }
              />
            </Switch>
          </Suspense>
          </ErrorBoundary>
      </div>
    );
  }
}


export default App;
