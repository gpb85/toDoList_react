import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../Pages/TodoList";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const userData = {
    username: "Giorgos",
    password: "1234",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === userData.username && password === userData.password) {
      navigate("/TodoList");
    } else console.log("wrong userData");
  };

  return (
    <div className="header">
      <div className="top-header">
        <div className="logo">
          <div className="logo-image">
            <span id="logo-image">
              <img src="" alt="" />
            </span>
          </div>
        </div>
        <div className="signin-form">
          <h4>Sign In</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                id="username"
                name="username required"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
                required
              />
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
