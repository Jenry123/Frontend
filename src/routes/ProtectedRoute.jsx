import React from 'react';
import { Navigate } from 'react-router-dom';



const ProtectedRoute = ({ children, isAuthenticated, userRole, requiredRole }) => {
  
  if (!isAuthenticated) {
    
    return <Navigate to="/login" />;
  }

  
  if (requiredRole && userRole !== requiredRole) {

    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
