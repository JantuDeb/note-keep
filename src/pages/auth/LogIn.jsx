import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/auth/AuthContext";
import Button from "../../component/loader/Button";
import Input from "../../component/Input";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LogIn = () => {
  const [user, setUser] = useState({
    email: "user@ionvu.note",
    password: "ionvu@123",
  });
  const { email, password } = user;

  const { logIn , authState:{loading}} = useAuth();
  function inputChangeHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    logIn(user)
  }

  return (
    <main className="signup-main flex center">
      <form className="login-container radius-md shadow-gray p-4">
        <Input
          type="email"
          name="email"
          value={email}
          inputChangeHandler={inputChangeHandler}
          placeholder="Email address"
        />

        <Input
          type="password"
          name="password"
          value={password}
          inputChangeHandler={inputChangeHandler}
          placeholder="Password"
        />
        <div className="flex my-4 justify-between ">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="input-checkbox"
              name="remember"
              checked
            />
            <label htmlFor="remember" className="mx-2">
              Remember me
            </label>
          </div>
        </div>
        <Button
          loading={loading}
          text="Login"
          clickHandler={submit}
          btnStyle="btn-grad-red radius-md btn-login my-2 w-full"
        />
        <div className="flex justify-center">
          <span>Not registered yet? </span>
          <Link to="/signup" className="btn-link px-1 text-primary">
            Create an account
          </Link>
        </div>
      </form>
    </main>
  );
};
