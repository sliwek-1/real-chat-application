import './css/App.css';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SignupForm from './pages/signupForm';
import Home from './pages/home';
import NoPage from './pages/nopage';
import LoginForm from './pages/LoginForm';
import { useAuthContext } from './context/authContext';

function App() {
  const {token} = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
