import React from 'react';
import { Navigate, Route } from 'react-router-dom';


function ProtectedRoute({ isAuthenticated, children }) {
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }

export default ProtectedRoute;
