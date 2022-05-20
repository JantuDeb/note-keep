export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const initialAuthState = {
  user: null,
  isLogedIn: false,
  error:"",
  loading:false
};
export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case SIGNUP:
      return { ...state, user: payload, isLogedIn: true };
    case LOGOUT:
      return initialAuthState;
      case LOADING:
        return {...state, loading:payload.loading}
      case ERROR:
        return {...state, error:payload.error}
    default:
      break;
  }
};
