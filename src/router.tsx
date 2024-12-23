import {createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider,} from 'react-router-dom'
import {Login} from "pages/Login";
import {Profile} from "pages/Profile";
import {MessagesContainer} from "pages/Messages";
import {UsersContainer} from "pages/Users";
import {News} from "pages/News";
import {Music} from "pages/Music";
import {Settings} from "pages/Settings";
import Layout from "Layout";
import {useEffect} from "react";
import {getAuthUserData} from "redux/authReducer";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {useSelector} from "react-redux";
import {Preloader} from "components/Preloader";

const publicRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login/>,
    }
]

const privateRoutes: RouteObject[] = [

    {
        path: '/',
        element: <RedirectToProfile/>,
    },
    {
        path: '/profile/:uID?',
        element: <Profile/>,
    },
    {
        path: '/messages',
        element: <MessagesContainer/>,
    },
    {
        path: '/users',
        element: <UsersContainer/>,
    },
    {
        path: '/news',
        element: <News/>,
    },
    {
        path: '/music',
        element: <Music/>,
    },
    {
        path: '/settings',
        element: <Settings/>,
    },
]

export const Router = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    element: <PrivateRoutes/>,
                    children: privateRoutes,
                },
                ...publicRoutes,
                {
                    path: '*',
                    element: <h1>Not Found</h1>,
                },
            ],
        },
    ])

    return <RouterProvider router={router}/>
}


function PrivateRoutes() {
    const dispatch = useAppDispatch()
    const initializingApp = useSelector<ReducersType, boolean>(state => state.app.initializing)
    const isAuth = useSelector<ReducersType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        (async () => {
            await dispatch(getAuthUserData)
        })()
    }, [dispatch]);

    if (!initializingApp) return <Preloader/>

    return isAuth ? <Outlet/> : <Navigate to="/login"/>
}


function RedirectToProfile() {
    const uID = useSelector<ReducersType, number | null>(state => state.auth.id);

    return <Navigate to={`/profile/${uID}`}/>;
}
