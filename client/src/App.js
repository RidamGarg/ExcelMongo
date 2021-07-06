import React, { Component } from "react";
import "./App.css";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      select: "User",
      file: {},
    };
  }
  handleSelect = (e) => {
    console.log(e.target.value);
    this.setState({ select: e.target.value });
  };
  handleFile = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("excel", this.state.file);
    fd.append("category", this.state.select);
    await axios.post(`/upload/excel/data/${this.state.select}`, fd, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    this.forceUpdate();
  };
  render() {
    console.log(this.state);
    return (
      <div className="App App-header">
        <div className="d-flex row container  justify-content-center">
          <div className="col-8">
            <form
              style={{ backgroundColor: "white" }}
              className="shadow py-3 px-3"
            >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Select Excel File
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={this.handleSelect}
                >
                  <option value="User" selected>
                    User
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Product">Product</option>
                </select>
              </div>
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
