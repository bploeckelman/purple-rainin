'use strict';

import React from "react";
import ReactDOM from "react-dom";
import './main.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      data: '',
      isLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({file: event.target.file});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`a file was submitted: ${this.state.file}`);
    fetch('/', { method: 'POST' })
      .catch(error => console.error("Request error", error))
      .then(response => response.text())
      .then(data => {
        this.setState({
          data: data,
          isLoaded: true
        })
      });
  }

  render() {
    return (
      <div id="container">

        {this.state.isLoaded &&
          <div className="item left">
            <h3>plate data</h3>
            <pre>${this.state.data}</pre>
          </div>
        }
        {!this.state.isLoaded &&
          <div className="item left">
            <h3>file upload</h3>
            <form onSubmit={this.handleSubmit}>
              <label>
                File
                <input type="text" name="file" onChange={this.handleChange}/>
              </label>
              <input type="submit" value="Upload"/>
            </form>
          </div>
        }

        <div className="item right">
          <h3>calculated results</h3>
          <p>foo avg stddev something else</p>
        </div>

      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('react'));
