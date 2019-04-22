//! Class component State, state here is not shared.
import React, { Component } from "react";
// import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class AddTodo extends Component {
  //class component has state
  state = {
    title: ""
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          placeholder="Add a Todo..."
          style={{ flex: "10", padding: "5px" }}
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="submit"
          className="btn"
          style={{ flex: "1", cursor: "pointer" }}
        />
      </form>
    );
  }

  //! Methods
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    // avoid to submit form, and prop the form title
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };
  //! -------
}

// Prop type
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;
