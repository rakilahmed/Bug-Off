import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import './App.css';
import { AuthProvider } from './firebase/AuthContext';
import { EmployeeProvider, TicketProvider, TaskProvider } from './components';
import {
  PrivateRoute,
  PublicRoute,
  Register,
  Login,
  ForgotPassword,
  Dashboard,
  Tickets,
  Employees,
  Profile,
} from './pages/';

const App = () => {
  return (
    <Router>
      <Container style={{ maxWidth: '1350px' }}>
        <AuthProvider>
          <ConfirmProvider>
            <EmployeeProvider>
              <TicketProvider>
                <TaskProvider>
                  <Routes>
                    <Route
                      path="/register"
                      element={
                        <PublicRoute>
                          <Register />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={
                        <PublicRoute>
                          <ForgotPassword />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/tickets"
                      element={
                        <PrivateRoute>
                          <Tickets />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/employees"
                      element={
                        <PrivateRoute>
                          <Employees />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </TaskProvider>
              </TicketProvider>
            </EmployeeProvider>
          </ConfirmProvider>
        </AuthProvider>
      </Container>
    </Router>
  );
};

export default App;
