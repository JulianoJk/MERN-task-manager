import Index from './components/Pages/Index/Index';
import Home from './components/Pages/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Profile from './components/Pages/Profile/Profile';
import PasswordReset from './components/PasswordReset';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { TaskContextProvider } from './context/TaskContext';

function App() {
	return (
		<div>
			<BrowserRouter>
				<TaskContextProvider>
					<Navigation />
					<Routes>
						<Route exact path="/" element={<Index />} />
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/password-reset" element={<PasswordReset />} />
					</Routes>
				</TaskContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
