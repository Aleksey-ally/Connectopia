import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType} from 'redux/reduxStore';

export const WthAuthRedirect = <T, >(Component: ComponentType<T>) => {
    return (props: T) => {
        const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

        if (!isAuth) return <Navigate to={'/login'}/>

        return <Component {...props as T & {}} />
    }

};