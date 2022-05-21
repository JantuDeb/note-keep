import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  authReducer,
  initialAuthState,
  LOGIN,
  LOGOUT,
  SIGNUP,
  ERROR,
  LOADING,
} from "./auth-reducer";
import axios from "axios";
import { axiosConfig } from "../utils";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  const navigate = useNavigate();
  const signUp = async (user) => {
    try {
      const { data } = await axios.post("/signup", user, axiosConfig);
      if (data.success) {
        authDispatch({ type: SIGNUP, payload: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logIn = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        "/login",
        { email, password },
        axiosConfig
      );
      if (data.success) {
        authDispatch({ type: LOGIN, payload: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      const { data } = await axios.get("/logout", axiosConfig);
      if (data.success) {
        authDispatch({ type: LOGOUT });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const savePhoto = async ({ file }) => {
    authDispatch({ type: LOADING, payload: { loading: true } });
    const formData = new FormData();
    if (file) formData.append("photo", file);
    console.log(formData);
    try {
      const { data } = await axios.post("/user/update_user_details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...axiosConfig,
      });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        authDispatch({ type: LOGIN, payload: data.user });
      }
    } catch (error) {
      authDispatch({ type: ERROR, payload: { error: error.message } });
    } finally {
      authDispatch({ type: LOADING, payload: { loading: false } });
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user && authDispatch({ type: LOGIN, payload: user });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        logIn,
        logOut,
        signUp,
        savePhoto,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
