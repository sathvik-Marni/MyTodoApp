import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../firebase";

const AddTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [empty, setEmpty] = useState(false);
  const navigate = useNavigate();

  const todosCollectionRef = collection(db, "todos");
  const postTodo = async (todoData) => {
    await addDoc(todosCollectionRef, {
      todo: todoData,
      author: { name: auth.currentUser.email, id: auth.currentUser.uid },
    });
    navigate("/mytodos");
  };

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/");
    }
  });

  const onFormSubmit = (todoElement) => {
    let todoData = todoElement.todo;
    todoData = todoData.replace(/^[ \r\n]+$/gi, "");
    if (todoData === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
      postTodo(todoData);
    }
  };

  return (
    <div className="container-fluid background-design">
      <div className="pt-4">
        <div className="card border border-dark border-3 add-todo-card mx-auto">
          <h4 className="card-header text-center p-3">MyTodo</h4>
          <div className="card-body p-2">
            {empty && (
              <div className="alert alert-danger text-center m-3" role="alert">
                Only empty lines cannot be added
              </div>
            )}
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="form-group">
                <div className="text-center">
                  <label htmlFor="todo" className="form-label">
                    What's on your mind?
                  </label>
                </div>
                <textarea
                  id="todo"
                  className="form-control p-2"
                  rows="10"
                  {...register("todo", { required: true })}
                />
              </div>
              {errors.todo?.type === "required" && (
                <p className="text-danger">* Enter some notes to add note</p>
              )}

              <div className="text-center mt-3">
                <button className="btn btn-design text-white m-3">Add todo</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
