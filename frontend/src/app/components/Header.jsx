import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Mappr Polling App</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}