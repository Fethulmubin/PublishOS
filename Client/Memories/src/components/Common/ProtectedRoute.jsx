import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authData = useSelector((state) => state?.auth?.authData);
  if (!authData) return <Navigate to="/auth" replace />;
  return children;
};

export default ProtectedRoute;
