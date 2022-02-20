import Index from "./components/Index";
import Home from "./components/Home/Home";
import Menu from "./components/Menu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import PasswordReset from "./components/PasswordReset";
import ContextProvider from "./context/ContextProvider";
import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
        <Menu />
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
