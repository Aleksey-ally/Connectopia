import axios from 'axios';
import React, { useEffect } from "react";
import { Header } from './Header';
import { useDispatch } from 'react-redux';
import { Auth, setAuthUserData } from 'redux/authReducer';
import { useSelector } from 'react-redux';
import { ReducersType } from 'redux/reduxStore';

type BaseResponseType<D = {}> = {
    data: D;
};

export type ResponseAuth = {
    data: {
        id: number
        login: string
        email: string
    }
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export const HeaderContainer: React.FC = () => {

    const auth = useSelector<ReducersType, Auth>(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true }).then((res: BaseResponseType<ResponseAuth>) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData({ ...res.data.data, isAuth: true }))
            }
        })
    }, [])


    return <Header auth={auth} />
}