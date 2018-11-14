import React from "react";
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import VotePage from './pages/VotePage.jsx';
import ResultPage from './pages/ResultPage.jsx';

export default class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/polls/:id' component={ResultPage} />
				<Route exact path='/polls/:id/vote' component={VotePage} />
			</Switch>
		)
	}
}