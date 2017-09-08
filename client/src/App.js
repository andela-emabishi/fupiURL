import React, { Component } from 'react';
import UrlPage from './components/UrlPage';
import './container.css'

class App extends Component {
  render() {
    return (
      <div className="ui raised very padded text container">
        <UrlPage />
      </div>
    );
  }
}

export default App;
