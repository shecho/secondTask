import React, { useState, useEffect } from "react";
import "./App.css";
import TodoCard from "./components/Card";
import AddTaskForm from "./components/AddTaskForm";
import NavBar from "./components/NavBar";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Container, Fab } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
      setTodos(() => localTodos.items);
    } else {
      let url = "https://jsonplaceholder.typicode.com/users/1/todos";
      let response = await fetch(url);
      let res = await response.json();
      setTodos(() => res);
    }
  };
  const handleInput = (e) => {
    const data = {
      id: todos.length + 1,
      userId: 1,
      [e.target.name]: e.target.value,
    };
    setNewTodo((prevState) => ({ ...prevState, ...data }));
  };
  const addTask = async (e) => {
    e.preventDefault();

    // add todo t the server
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newTodo),
    });
    showAlert(response.status);
    // simulate add  to server
    setTodos((prevState) => [...prevState, newTodo]);
  };
  const deleteTask = async (e) => {
    let taskId = parseInt(e.target.parentElement.id);

    // delete request to the server
    let url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
    let request = await fetch(url, { method: "DELETE" });
    console.log(request.status);
    // simulate dalete from server
    let newTodoList = todos.filter((todo) => todo.id !== taskId);
    setTodos(() => newTodoList);
  };

  const saveLocal = () => {
    let todosLocal = [...todos];
    let savedTodos = {
      items: todosLocal,
    };
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  };
  const deleteLocal = async () => {
    localStorage.clear();
    getTodos();
  };
  const showAlert = (status) => {
    status === 201 ? setOpen(true) : setOpen(false);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };
  return (
    <div className="App">
      <NavBar saveLocal={saveLocal} deleteLocal={deleteLocal} />
      <Container maxWidth="lg">
        <Grid container justify={"center"} style={{ marginBottom: "20px" }}>
          <Fab
            onClick={() => setShowForm(!showForm)}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          {showForm ? (
            <AddTaskForm handleInput={handleInput} addTask={addTask} />
          ) : (
            ""
          )}
          {open ? (
            <div>
              <Alert onClose={() => {}}>Todo Created Successfully</Alert>
            </div>
          ) : (
            ""
          )}
        </Grid>
        <Grid container spacing={4} justify={"center"}>
          {todos.map((todo) => {
            return (
              <Grid key={todo.id} item xs={12} sm={10} md={6} lg={4}>
                <TodoCard todo={todo} deleteTask={deleteTask} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
