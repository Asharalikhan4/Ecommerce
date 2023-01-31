import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">
          Admin Dashboard
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
          </ul>
          <span>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/signup" class="nav-link" aria-current="page">
                  Signup
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/signin" class="nav-link">
                  Signin
                </Link>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
