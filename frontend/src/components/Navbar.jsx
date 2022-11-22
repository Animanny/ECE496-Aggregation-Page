import { Component } from "react";
import "./css/navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: props.header,
    };
  }

  render() {
    return (
      <div class="NavBar">
        <h1>{this.state.header}</h1>
      </div>
    );
  }
}
