import { authAPI } from 'api/api';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Auth, setAuthUserData } from 'redux/authReducer';
import { ReducersType } from 'redux/reduxStore';
import { Header } from './Header';

export const HeaderContainer: React.FC = () => {

    const auth = useSelector<ReducersType, Auth>(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        authAPI.auth()
            .then((data) => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData({ ...data.data, isAuth: true }))
                }
            })
    }, [])


    return <Header auth={auth} />
}