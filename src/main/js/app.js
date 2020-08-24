'use strict';

import React, {useState} from "react";
import ReactDOM from "react-dom";
import {useDropzone} from "react-dropzone";
import './main.css'

function App(props) {

  const [fileData, setFileData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: limit accepted files to just one
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: upload the file to the backend and get a result back
    acceptedFiles.forEach(file => {
      console.log(`Uploading file: ${file.path}`)
    });
    fetch('/', { method: 'POST' })
      .catch(error => console.error("Request error", error))
      .then(response => response.text())
      .then(data => {
        setFileData(data);
        setIsLoaded(true);
      });
  };

  return (
    <section id="container">

      {isLoaded &&
        <div className="item left">
          <h3>plate data</h3>
          <pre>${fileData}</pre>
        </div>
      }
      {!isLoaded &&
        <div className="item left">
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <aside>
              <h3>FILES</h3>
              <ul>{files}</ul>
            </aside>
          </div>
          <div>
            <button onClick={handleSubmit}>Upload Files</button>
          </div>
        </div>
      }

      <div className="item right">
        <h3>calculated results</h3>
        <p>
          {isLoaded ? 'foo: avg stddev something' : '[no data]'}
        </p>
      </div>

    </section>
  );

}

ReactDOM.render(<App />, document.getElementById('react'));
