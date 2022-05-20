import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../component/loader/Button";
import Input from "../../component/Input";

export const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { name, email, password } = user;

  const { signUp, authState:{loading} } = useAuth();
  function inputChangeHandler(e) {
    if (e.target.name === "confirm-password")
      setConfirmPassword(e.target.value);
    else setUser({ ...user, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    signUp(user);
  }

  return (
    <main className="signup-main flex center">
      <form
        className="signup-container radius-md shadow-gray py-4"
      >
        <Input
          type="email"
          name="email"
          value={email}
          inputChangeHandler={inputChangeHandler}
          placeholder="Email address"
        />
        <Input
          name="name"
          value={name}
          inputChangeHandler={inputChangeHandler}
          placeholder="Full name"
        />

        <Input
          type="password"
          name="password"
          value={password}
          inputChangeHandler={inputChangeHandler}
          placeholder="Password"
        />
        <Input
          type="password"
          name="confirm-password"
          value={confirmPassword}
          inputChangeHandler={inputChangeHandler}
          placeholder="Confirm password"
        />
        <div className="text-red">
          {password !== confirmPassword &&
            "Password and confirm password must be same"}
        </div>
        <div className="flex my-2 items-center">
          <label htmlFor="terms-and-conditions">
            I agree to the
            <a href="/signup" className="btn-link px-1">
              terms and conditions
            </a>
          </label>
          <input
            type="checkbox"
            checked
            className="input-checkbox"
            name="terms-and-conditions"
          />
        </div>
        <Button loading={loading} text="Regester new account" clickHandler={submit} btnStyle={`radius-md ${
            password === confirmPassword ? "btn-grad-red" : "disable"
          }`} disable={password !== confirmPassword}/>
      </form>
    </main>
  );
};

