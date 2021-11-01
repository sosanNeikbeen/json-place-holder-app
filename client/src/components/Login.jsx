import React from "react";

const Login = () => {
  return (
    <div className="form-container">
      <div className="box">
        <h2 className="header">Please Login</h2>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button className="button" type="submit">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
