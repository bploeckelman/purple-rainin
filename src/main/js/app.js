'use strict';

import React from "react";
import ReactDOM from "react-dom";
import './main.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  componentDidMount() {
    fetch('/', { method: 'POST' })
      .catch(error => console.error("Request error", error))
      .then(response => response.text())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <div id="container">
        <div className="itemLeft">
          <h3>plate data</h3>
          <pre>${this.state.data}</pre>
        </div>
        <div className="itemRight">
          <h3>calculated results</h3>
          <p>foo avg stddev something else</p>
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('react'));
