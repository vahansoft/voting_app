import React from 'react';

import Header from './components/Header.jsx';
import Routes from './routes.jsx';

export default class App extends React.Component {
  render() {
    return [
    	<Header key={0} />, 
    	<Routes key={1} />
    ];
  }
}