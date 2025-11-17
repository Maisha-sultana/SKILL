
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, loading }) => {
  const location = useLocation();

  useEffect(() => {
    
    if (!loading && !isLoggedIn) {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
  }, [loading, isLoggedIn, location.pathname]);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold text-rose-600">Checking authentication...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;