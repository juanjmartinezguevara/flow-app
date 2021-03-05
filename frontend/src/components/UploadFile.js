import React, { Component } from "react";
import axios from "axios";
import actions from '../api'

class UploadFile extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    console.log(event.target, event.target.files)
    this.setState({ selectedFile: event.target.files[0] });
  };


onFileUpload = (pr) => {
    console.log('PR', pr)
    let file = this.state.selectedFile;
    let fileName = this.state.selectedFile.name;
    let fileType = this.state.selectedFile.type;

    console.log('File Name', fileName)
    console.log('FILETYPE', fileType)
    actions.uploadFile({fileName, fileType, file, kind:'song'})
    .then(res => {
      console.log(res)
    })
    .catch(console.error)
}


  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>GeeksforGeeks</h1>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default UploadFile;
