import React from 'react'
import { Navigate,useLocation } from 'react-router';
import { useSelector } from 'react-redux';

export default function Auth({children}) {
    const auth = useSelector( (state) => state.auth.authenticated);
    const location = useLocation();
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}
