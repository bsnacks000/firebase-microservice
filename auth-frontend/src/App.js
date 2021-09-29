import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
// import User from './pages/User';

import themeObj from './utils/theme';

import React from 'react';
import Navbar from './component/layout/Navbar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';
import { Provider } from 'react-redux';
import store from './redux/store';

// import SimpleMenu from './component/Menu';

const theme = createTheme(themeObj)

const token = localStorage.FBIDtoken

if (token){
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()){
		store.dispatch(logoutUser())
		window.location.href = "/login"
	} else {
		store.dispatch({ type: SET_AUTHENTICATED});
		axios.defaults.headers.common['Authorization'] = token
		store.dispatch(getUserData());
	}

}

function App() {
	
  return (
    <div className="App">
	<ThemeProvider theme={theme}>
    	<Provider store={store}>
			<Router>
				<Navbar/>
					<div className="container">
						<Switch>
							<Route path="/" component={Home} exact/>
							<Route path="/login" component={Login}/>
						</Switch>
					</div>
			</Router>
		</Provider>
	</ThemeProvider>
    </div>
  );
}

export default App;
