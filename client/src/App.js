import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import './App.css';
import { AuthProvider } from './firebase/AuthContext';
import { EmployeeProvider, TicketProvider, TaskProvider } from './components';
import {
  Login,
  ForgotPassword,
  Register,
  Dashboard,
  Profile,
  Tickets,
  Employees,
} from './pages/';

function App() {
  return (
    <Router>
      <Container style={{ maxWidth: '1350px' }}>
        <AuthProvider>
          <ConfirmProvider>
            <EmployeeProvider>
              <TicketProvider>
                <TaskProvider>
                  <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/employees" element={<Employees />} />
                  </Routes>
                </TaskProvider>
              </TicketProvider>
            </EmployeeProvider>
          </ConfirmProvider>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
