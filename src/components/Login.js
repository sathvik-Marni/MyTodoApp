import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [valid, setValid] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      navigate("/");
    }
  });

  const onFormSubmit = (data) => {
    userLogin(data);
  };

  const gotoSignin = () => {
    navigate("/signin");
  };

  const userLogin = async (data) => {
    await signInWithEmailAndPassword(auth, data.username, data.password)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setValid(1);
        navigate("/");
      })
      .catch(() => {
        setValid(0);
      });
  };

  return (
    <div>
      <div className="container-fluid background-design">
        <div className="pt-4">
          <div className="card border-3 login-signin-card mx-auto bg-light border border-dark shadow mb-5 bg-white rounded">
            <h4 className="card-header text-center">Login</h4>
            <div className="card-body p-3">
              {valid === 0 && (
                <div
                  className="alert alert-danger text-center m-0"
                  role="alert"
                >
                  Invalid username or password
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
                  autoComplete="on"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-danger m-0">* enter your password</p>
                )}

                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-3">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center gap-2">
                <div>Don't have an account?</div>
                <button
                  className="text-primary inline-button"
                  onClick={gotoSignin}
                >
                  Signup here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
