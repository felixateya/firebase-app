// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../Firebase';
import Loader from '../Components/Loader';
const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate()
  const style = {
    backgroundColor: "#293A58",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <Loader style={style}/> // You can replace this with a loader/spinner component
  }

  if (!isAuthenticated) {
    return navigate('/login');
  }

  return <Outlet />;
};

export default ProtectedRoute;
