import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@/redux/reducers/auth.reducer";
import { showError } from "@/redux/reducers/error.reducer";
import useLoginModal from '@/hooks/useLoginModal';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const AuthWrapper: React.FC<P> = (props: P) => {
        const router = useRouter();
        const isAuthenticated = useSelector(selectAuthState);
        const token = localStorage.getItem('token');
        const dispatch = useDispatch();

        useEffect(() => {
            if (!isAuthenticated || !token) {
                dispatch(showError('You need to be logged in to access this page'))
                
                router.push({
                    pathname: '/',
                });
            }
        }, [dispatch, isAuthenticated, router, token]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return AuthWrapper;
};

export default withAuth;