import React, { Component } from "react";
import axios from "axios";

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
    axios.post("http://localhost:5000/api/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      var options = {
        headers: {
          'Content-Type': fileType,
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => { this.setState({audio: url,
      },()=>console.log(this.state.audio))
      //post url to mongoose here??  or better do it from backend index.js before sending response to here???
      alert("File uploaded")})
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
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
