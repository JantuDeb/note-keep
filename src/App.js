import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import { LogIn } from "./pages/auth/LogIn";
import { SignUp } from "./pages/auth/SignUp";
import { Archive } from "./pages/home/Archive";
import { Home } from "./pages/home/Home";
import Notes from "./pages/home/Notes";
import { Profile } from "./pages/home/Profile";
import { Trash } from "./pages/home/Trash";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route index element={<Notes />} />
        <Route path="trash" element={<Trash />} />
        <Route path="archive" element={<Archive />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
