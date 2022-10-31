import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
import './App.css';


import Homepage from './components/Homepage/Homapage'
import Mangas from './components/Mangas/Mangas'
import FicheManga from './components/FicheManga/FicheManga'
import ScanPage from './components/ScanPage/ScanPage'
import SignUp from './components/Login/SignUp/SignUp'
import SignIn from './components/Login/SignIn/SignIn'
import PersonalSpace from './components/PersonalSpace/PersonalSpace'
import ResetPassword from './components/Login/ResetPassword/ResetPassword'
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <Switch>
       <Route path='/' exact component={Homepage} />
       <Route path='/mangas' component={Mangas}/>
       <Route exact path='/manga/:mangaId' component={FicheManga}/>
       <Route exact path='/manga/:mangaId/:chapter/:page' component={ScanPage}/>
       <Route exact path='/signup' component={SignUp}/>
       <Route exact path='/signin' component={SignIn}/>
       <Route exact path='/reset-password' component={ResetPassword}/>
       <Route exact path='/personal-space' component={PersonalSpace}/>
       <Redirect to='/'/>
      </Switch>
    </div>
    </Provider>
  );
}

export default App;
