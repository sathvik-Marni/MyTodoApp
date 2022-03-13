import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const addTodo = () => {
    navigate("/addtodo");
  };

  const myTodos = () => {
    navigate("/mytodos");
  };

  const login = () => {
    navigate("/login");
  };

  const signin = () => {
    navigate("/signin");
  };

  return (
    <div className="background-design text-center">
      <div className="d-flex justify-content-center align-items-center flex-column h-50">
        <div className="display-4 bg-dark border border-info border-3 p-3 m-2">
          <span className="text-danger">Jot</span>{" "}
          <span className="text-success">down</span>{" "}
          <span className="text-secondary">your</span>{" "}
          <span className="text-primary">creative</span>{" "}
          <span className="text-info">Mind</span>
        </div>
        {localStorage.getItem("isAuth") ? (
          <div>
            <button className="mt-3 me-1 btn btn-primary" onClick={addTodo}>
              Let's get started
            </button>
            <button className="mt-3 ms-1 btn btn-warning" onClick={myTodos}>
              My Todos
            </button>
          </div>
        ) : (
          <div>
            <button className="mt-3 me-1 btn btn-primary" onClick={signin}>
              Let's sign you in
            </button>
            <button className="mt-3 ms-1 btn btn-warning" onClick={login}>
              I already have an account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
