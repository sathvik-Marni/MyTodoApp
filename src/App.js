import { auth } from "./firebase";
import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Home from "./components/Home";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Signin from "./components/Signin";
import AddTodo from "./components/AddTodo";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("user", user?.uid);
  });

  const userSignOut = async () => {
    await signOut(auth).then(() => {
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            MyTodoApp
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {localStorage.getItem("isAuth") && (
              <Nav className="me-auto">
                <NavLink className="nav-link" to="mytodos">
                  My Todos
                </NavLink>
                <NavLink className="nav-link" to="addtodo">
                  AddTodo
                </NavLink>
              </Nav>
            )}
            {!localStorage.getItem("isAuth") ? (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="signin">
                  Signin
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                {localStorage.getItem("isAuth") && (
                  <div className="mt-2 mb-2 me-2 text-secondary">
                    {user?.email}
                  </div>
                )}
                <div className="gap-2 justify-space-between align-items-center">
                  <button className="sign-out-button" onClick={userSignOut}>
                    Signout
                  </button>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mytodos" element={<Todo />} />
        <Route path="/addtodo" element={<AddTodo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <footer className="text-center text-lg-start bg-dark text-white">  
        <h6 className="text-center p-4 m-0">
          Created by <a className="text-reset fw-normal" href="mailto: sathvik.marni@gmail.com">sathvik Marni</a>
        </h6>
      </footer>
    </div>
  );
}

export default App;
