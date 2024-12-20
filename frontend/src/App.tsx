import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { UserSignupPage } from "./pages/UserSignupPage";
import { UserLoginPage } from "./pages/UserLogin";
import { CaptainSignUpPage } from "./pages/CaptainSignUp";
import { CaptainLoginPage } from "./pages/CaptainLogin";
import { UserProtectedRoute } from "./components/userProtectedRoutes";
import { UserHomePage } from "./pages/HomePage";
import { UserLogOut } from "./pages/UserLogOut";
import { CaptainHomePage } from "./pages/CaptainHome";
import { UserRideComingPage } from "./pages/UserRidingPage";
import { RideRequestsPage } from "./pages/RideRequests";
import { OngoingRidePage } from "./components/OngoingRide";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StartPage />} path="/" />
        <Route element={<UserSignupPage />} path="/user/signUp" />
        <Route element={<UserLoginPage />} path="/user/login" />
        <Route element={<CaptainSignUpPage />} path="/captain/signUp" />
        <Route element={<CaptainLoginPage />} path="/captain/login" />
        <Route
          element={<UserProtectedRoute>{<UserHomePage />}</UserProtectedRoute>}
          path="/user/home"
        />
        <Route element={<CaptainHomePage />} path="/captain/home" />
        <Route element={<UserRideComingPage />} path="/user/ride/:rideId" />
        <Route element={<RideRequestsPage />} path="/captain/RideRequests" />
        <Route element={<OngoingRidePage />} path={`/captain/ride/:rideId`} />

        <Route
          element={<UserProtectedRoute>{<UserLogOut />}</UserProtectedRoute>}
          path="/user/logOut"
        />
      </Routes>
    </BrowserRouter>
  );
}
// MaliNa123@!
export { socket, App };
