import { Component } from "react";
import "./css/navbar.css";
import logo from "./static/capstone.png";

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
        <img src={logo} alt="Logo"></img>
        <h1>{this.state.header}</h1>
        <h5>{"Assignment Performance"}</h5>
        <h5>{"Script Configurator"}</h5>
      </div>
    );
  }
}
