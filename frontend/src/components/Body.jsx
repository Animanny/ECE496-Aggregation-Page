import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./css/body.css";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plugins: {"Require Recursion": "recursiveFunctionPlugin",
                "Allow Global Variables": "globalVarPlugin",
                "Disallow Specific Libraries":"libraryCatchPlugin"},
      enabledPlugins: {},
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleGenerateSubmit = this.handleGenerateSubmit.bind(this)
  }

  render() {
    const pluginDict = this.state.plugins;
    return (
      <div id="AppBody">
        <Form id="plugin-selector-form">
          {Object.keys(pluginDict).map((plugin) => {
            return (
              <Form.Check name={plugin} type="switch" id="custom-switch" label={plugin} onChange={this.handleCheckboxChange}/>
            );
          })}
          <Button variant="primary" onClick={this.handleGenerateSubmit} >Generate Script</Button>{" "}
        </Form>
      </div>
    );
  }
  handleCheckboxChange(event) {
    console.log("In handleCheckboxChange!")
    const target = event.target
    const checked = target.checked
    const name = target.name
    console.log(name)
    if(checked === true){
      var currEnabled = this.state.enabledPlugins
      var args = ""
      if(name === "Disallow Specific Libraries"){
        args = "unordered_map"
      }
      currEnabled[this.state.plugins[name]] = args

      this.setState({
          enabledPlugins: currEnabled,
      });
    }
    console.log(this.state)
  }

  handleGenerateSubmit(event){
    event.preventDefault();
    console.log("In handleGenerateSubmit!")
    var finalDict = {"clang-plugins":this.state.enabledPlugins}
    finalDict["make_cfiles"] = ["test", "test2"]
    console.log(finalDict)
    const options = { 
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalDict)
    }    
    
    fetch('/scriptgen', options)
      .then((response) => {
        var a = response.body.getReader();
        a.read().then(({ done, value }) => {
        // console.log(new TextDecoder("utf-8").decode(value));
        saveAsFile(new TextDecoder("utf-8").decode(value), 'script-config');
      }
    );
});


function saveAsFile(text, filename) {
  // Step 1: Create the blob object with the text you received
  const type = 'application/json'; // modify or get it from response
  const blob = new Blob([text], {type});

  // Step 2: Create Blob Object URL for that blob
  const url = URL.createObjectURL(blob);

  // Step 3: Trigger downloading the object using that URL
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click(); // triggering it manually
}
  }
}
