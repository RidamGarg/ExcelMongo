import React, { Component } from "react";
import "./App.css";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
      msg: null,
    };
  }
  handleFile = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
      msg: null,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("excel", this.state.file);
    this.setState({ msg: "Excel Sheet Added Successfully" });
    await axios.post(`/upload/excel/data`, fd, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  render() {
    console.log(this.state);
    return (
      <div className="App App-header">
        <div className="d-flex row container  justify-content-center">
          <div className="col-lg-8 col-sm-10 col-11">
            {this.state.msg && (
              <div class="alert alert-warning " role="alert">
                <p>{this.state.msg}</p>
              </div>
            )}
            <form
              style={{ backgroundColor: "white", borderRadius: 15 }}
              className="shadow py-4 px-4"
            >
              <h3 className="text-center my-3">Add Your Excel Sheet</h3>

              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Excel File Input
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={this.handleFile}
                />
              </div>

              <div class="d-grid gap-2">
                <button
                  class="btn btn-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
