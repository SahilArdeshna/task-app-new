import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router";

import Tasks from "./pages/tasks";
import Profile from "./pages/user";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Navigate replace to="/tasks" />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
