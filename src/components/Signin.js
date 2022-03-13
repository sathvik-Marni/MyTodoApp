import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [match, setMatch] = useState(1);
  const [error, setError] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      navigate("/");
    }
  });

  const onFormSubmit = (data) => {
    if (data.password === data.passwordCheck) {
      setMatch(1);
      userRegister(data);
    } else {
      setMatch(0);
      setError(0);
    }
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const userRegister = async (data) => {
    await createUserWithEmailAndPassword(auth, data.username, data.password)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setError(0);
        navigate("/");
      })
      .catch(() => {
        setError(1);
      });
  };

  return (
    <div className="">
      <div className="container-fluid background-design">
        <div className="pt-4">
          <div className="card login-signin-card mx-auto bg-light border border-dark border-3 shadow mb-5 bg-white rounded">
            <h4 className="card-header text-center">Sign-in</h4>
            <div className="card-body p-3">
              {match === 0 && (
                <div
                  className="alert alert-danger text-center m-0"
                  role="alert"
                >
                  Passwords do not match
                </div>
              )}
              {error === 1 && (
                <div className="alert alert-info text-center m-0" role="alert">
                  Email has already been registered
                </div>
              )}
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <label htmlFor="username" className="form-label m-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  autoComplete="on"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <p className="text-danger m-0">* enter your username</p>
                )}

                <label htmlFor="password" className="form-label m-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-danger m-0">* enter your password</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-danger m-0">* minimum 8 characters</p>
                )}

                <label htmlFor="passwordCheck" className="form-label m-2">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordCheck"
                  autoComplete="new-password"
                  {...register("passwordCheck", { required: true })}
                />
                {errors.passwordCheck?.type === "required" && (
                  <p className="text-danger m-0">* re-enter your password</p>
                )}

                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-3">
                    Sign-in
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <div className="d-flex justify-content-center gap-2">
                <div>Already a member?</div>
                <button
                  className="text-primary inline-button"
                  onClick={gotoLogin}
                >
                  Login here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
