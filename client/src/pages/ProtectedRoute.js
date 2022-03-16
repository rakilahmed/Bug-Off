import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;
