import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import Login from "./pages/auth/Login";
import Tasks from "./pages/tasks/Tasks";
import Profile from "./pages/user/Profile";
import Registration from "./pages/auth/Registration";

function App() {
  return (
    <Routes>
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
