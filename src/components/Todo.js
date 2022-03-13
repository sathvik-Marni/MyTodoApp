import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Fade } from "react-bootstrap";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Todo = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [formContent, setFormContent] = useState("");
  const [updateTodoItem, setUpdateTodoItem] = useState("");
  const [empty, setEmpty] = useState(false);
  const [remove, onRemove] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (todo, id) => {
    setShow(true);
    setFormContent(todo);
    setUpdateTodoItem(formContent);
    setTodoId(id);
    setEmpty(false);
  };

  useEffect(() => {
    const todoCollectionRef = collection(db, "todos");
    const getTodoList = async () => {
      setLoading(true);
      const data = await getDocs(todoCollectionRef);
      setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getTodoList();
  }, [remove]);

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/");
    }
  });

  const updateTodo = async () => {
    const todoDoc = doc(db, "todos", todoId);
    await updateDoc(todoDoc, { todo: updateTodoItem });
    window.location.reload();
  };

  const validateUpdateTodo = (e) => {
    const todoData = updateTodoItem.replace(/^[ \r\n]+$/gi, "");
    if (todoData === "") {
      setEmpty(true);
      e.preventDefault();
    } else {
      setEmpty(false);
      e.preventDefault();
      updateTodo();
    }
  };

  const deleteTodo = async (todoId) => {
    const deleteTodo = doc(db, "todos", todoId);
    await deleteDoc(deleteTodo);
    onRemove(!remove);
  };

  const gotoAddTodo = () => {
    navigate("/addTodo");
  };

  const userData = todoList?.filter(
    (todoData) => localStorage.getItem("user") === todoData.author.id
  );

  return (
    <div className="container-fluid background-design">
      {loading ? (
        <div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info mt-4" role="status"></div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center display-6 p-3">My Todos</div>
          <div className="row justify-content-center">
            {userData?.length > 0 ? (
              userData.map((todoData) => (
                <div
                  key={todoData.id}
                  className="col-xs-12 col-sm-6 col-md-4 p-2"
                >
                  <div className="card card-design border border-3 border-dark shadow mb-4 bg-body rounded h-100">
                    <div className="card-body ">{todoData.todo}</div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="edit-icon m-1"
                        onClick={() => handleShow(todoData.todo, todoData.id)}
                      >
                        <img
                          src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/32/000000/external-edit-miscellaneous-kiranshastry-lineal-color-kiranshastry.png"
                          alt="edit icon"
                        />
                      </button>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        animation={Fade}
                        className="m-0"
                      >
                        <Modal.Body className="edit-todo-modal rounded">
                          <form onSubmit={validateUpdateTodo}>
                            <label htmlFor="editTodo" className="form-label">
                              <h4>Edit my todo</h4>
                            </label>
                            {empty && (
                              <div className="alert alert-danger" role="alert">
                                Empty data cannot be added
                              </div>
                            )}
                            <textarea
                              className="form-control"
                              id="editTodo"
                              rows="10"
                              defaultValue={formContent}
                              onChange={(e) =>
                                setUpdateTodoItem(e.target.value)
                              }
                            />
                            <div className="d-flex gap-2 justify-content-end align-items-center mt-2">
                              <button type="submit" className="btn btn-design text-white m-1">
                                Save changes
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleClose}
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </Modal.Body>
                      </Modal>

                      <button
                        className="delete-icon m-1"
                        onClick={() => deleteTodo(todoData.id)}
                      >
                        <img
                          src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/32/000000/external-delete-miscellaneous-kiranshastry-lineal-color-kiranshastry.png"
                          alt="delete icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="container-fluid">
                <div
                  className="alert alert-info text-center m-4 border border-dark border-3"
                  role="alert"
                >
                  <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                    <h3>You currently don't have any!</h3>
                    <h5>Click below to add some todos</h5>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              className="btn btn-design text-white m-3"
              onClick={gotoAddTodo}
            >
              Add todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
