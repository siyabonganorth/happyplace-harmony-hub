
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index: React.FC = () => {
  // This page will simply redirect to login
  return <Navigate to="/login" replace />;
};

export default Index;
