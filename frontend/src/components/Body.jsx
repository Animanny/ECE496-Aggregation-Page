import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./css/body.css";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plugins: ["Require Recursion", "Allow Global Variables"],
    };
  }

  render() {
    return (
      <div id="AppBody">
        <Form id="plugin-selector-form">
          {this.state.plugins.map((plugin) => {
            return (
              <Form.Check type="switch" id="custom-switch" label={plugin} />
            );
          })}
          <Button variant="primary">Generate Script</Button>{" "}
        </Form>
      </div>
    );
  }
}
