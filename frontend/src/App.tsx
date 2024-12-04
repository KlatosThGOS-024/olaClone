import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { UserSignupPage } from "./pages/UserSignupPage";
import { UserLogin } from "./pages/UserLogin";
import { CaptainSignUp } from "./pages/CaptainSignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<UserSignupPage />} path="/user/signUp" />
        <Route element={<UserLogin />} path="/user/login" />
        <Route element={<CaptainSignUp />} path="/captain/signUp" />
        <Route element={<CaptainSignUp />} path="/captain/login" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
