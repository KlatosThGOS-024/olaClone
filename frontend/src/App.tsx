import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StartPage } from "./pages/StartPage";
import { UserSignupPage } from "./pages/UserSignupPage";
import { UserLogin } from "./pages/UserLogin";
import { CaptainSignUp } from "./pages/CaptainSignUp";
import { CaptainLogin } from "./pages/CaptainLogin";
import { UserProtectedRoute } from "./components/userProtectedRoutes";
import { HomePage } from "./pages/HomePage";
import { UserLogOut } from "./pages/UserLogOut";
import CaptainProtectWrapper from "./components/captainProtectedRoute";
import { CaptainHome } from "./pages/CaptainHome";
import { Riding } from "./pages/RidingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StartPage />} path="/" />
        <Route element={<UserSignupPage />} path="/user/signUp" />
        <Route element={<Riding />} path="/user/ride" />
        <Route element={<UserLogin />} path="/user/login" />
        <Route element={<CaptainLogin />} path="/captain/login" />
        <Route element={<CaptainSignUp />} path="/captain/signUp" />

        <Route
          element={<UserProtectedRoute>{<HomePage />}</UserProtectedRoute>}
          path="/home"
        />
        <Route
          element={<UserProtectedRoute>{<UserLogOut />}</UserProtectedRoute>}
          path="/user/logOut"
        />
        <Route element={<CaptainHome />} path="/captain/home" />
      </Routes>
    </BrowserRouter>
  );
}
// MaliNa123@!
export default App;
