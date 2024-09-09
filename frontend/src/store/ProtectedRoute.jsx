import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loggedInState } from './atoms/userauth';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useRecoilValue(loggedInState);

    if (!isLoggedIn) {
        toast.error("Please login to access this content");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
