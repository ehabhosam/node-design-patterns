// this is of course not my first time to use React, I'm a react dev for 3 years now lol
// yet this is my first time to use try React without hacking this step by either CRA or Vite

import React from "react";
import ReactDOM from "react-dom";

const h = React.createElement;

class Hello extends React.Component {
  render() {
    return <h1>Hello, from {this.props.name || "World!"}</h1>;
  }
}

ReactDOM.render(h(Hello, { name: "React" }), document.querySelector("body"));
