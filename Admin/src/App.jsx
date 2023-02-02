import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Main from "./pages/Main/Main.jsx";
import Signin from "./pages/Signin/Signin.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.js";
import PrivateRoute from "./components/HOC/PrivateRoute.js";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={ <Main /> } exact/>
        </Route>
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/signin" element={ <Signin /> } />
      </Routes>
    </>
  );
}

export default App;
