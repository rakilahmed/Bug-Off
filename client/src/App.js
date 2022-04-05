import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css';
import { AuthProvider } from './firebase/AuthContext';
import { Login, Register, Dashboard, Profile, Tickets } from './pages/';

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
