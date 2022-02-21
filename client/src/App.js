import Index from "./components/Index";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Pages/Profile/Profile";
import PasswordReset from "./components/PasswordReset";
import ContextProvider from "./context/ContextProvider";
import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />}  />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
