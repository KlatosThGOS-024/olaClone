import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { UserSignupPage } from "./pages/UserSignupPage";
import { UserLogin } from "./pages/UserLogin";
import { CaptainSignUp } from "./pages/CaptainSignUp";
import { CaptainLogin } from "./pages/CaptainLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<UserSignupPage />} path="/user/signUp" />
        <Route element={<UserLogin />} path="/user/login" />
        <Route element={<CaptainLogin />} path="/captain/login" />
        <Route element={<CaptainSignUp />} path="/captain/signUp" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
