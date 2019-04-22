//! Functional Component just to return a render
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={headerstyle}>
      <h1>Todo List</h1>
      <Link style={linkstyle} to="/">
        Home
      </Link>{" "}
      |{" "}
      <Link style={linkstyle} to="/about">
        About
      </Link>
    </header>
  );
}

//! Style
const headerstyle = {
  background: "#282828",
  color: "#f49e42",
  textAlign: "center",
  padding: "10px"
};

const linkstyle = {
  color: "#f49e42",
  textDecoration: "none"
};

export default Header;
