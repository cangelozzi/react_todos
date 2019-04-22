//! Component class state shared!
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//! External packages
// import uuid from "uuid"; no need with jsonplaceholder and axios
import axios from "axios";

//! Import Components
import Header from "./components/layout/Header";
import AddTodo from "./components/Addtodo";
import Todos from "./components/Todos";
import About from "./components/pages/About";

class App extends Component {
  // state are elements accesible by a component
  state = {
    todos: []
  };

  // like 'create' in Vue
  // thanks to https://jsonplaceholder.typicode.com/
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => this.setState({ todos: res.data }))
      .catch(err => console.log(err.response));
  }

  // render, is the only method ALWAYS required, and it's also called Lifecycle.
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />

            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }

  //! markComplete coming from Todoitem, id is coming from Todoitem props destructuring
  markComplete = id => {
    // state is an obj, and with setState we can change it
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //! Delete todo, with id coming from Todoitem
  delTodo = id => {
    //filter state obj, to get a new array without id to delete, spread operator copies array and filter it. We cannot change state, we need to make a copy with spread operator.
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
      )
      .catch(err => console.log(err.response));
  };

  //! Add Todo from input, passing title as prop argument
  addTodo = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
      .catch(err => console.log(err.response));
  };
}

export default App;
