import React from "react";
import { login } from "../../actions/auth";
import { useDispatch } from "react-redux";

const Signin = (props) => {
  const dispatch = useDispatch();
  
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email: "test@gmail.com",
      password: "123456"
    }
    dispatch(login(user));
  }
  return (
    <div className="container">
      <form className="w-50" onSubmit={userLogin}>
        <div className="h1 my-3">Signin</div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
