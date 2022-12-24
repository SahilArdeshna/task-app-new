import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import Tasks from "./pages/tasks";
import Profile from "./pages/user";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

function App() {
  return (
    <Routes>
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
