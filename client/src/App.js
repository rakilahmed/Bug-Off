import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css';
import { AuthProvider } from './firebase/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Tickets from './pages/Tickets';

function App() {
  return (
    <Router>
      <Container>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
