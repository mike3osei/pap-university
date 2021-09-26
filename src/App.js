import React, { Component, Fragment } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import School from "./pages/School";
import './App.css';

const history = createBrowserHistory();

class App extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<div className="">
				<Router history={history}>
					<Fragment>
						<main>
							<Switch>
                				<Route exact path="/" render={(props) => <Home {...props} />} />
					            <Route path="/school/:id" render={(props) => <School {...props} /> }/>
							</Switch>
						</main>
					</Fragment>
				</Router>
			</div>
		)
	}
}

export default App;