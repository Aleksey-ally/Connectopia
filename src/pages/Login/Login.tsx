import s from  './Login.module.scss'

import {LoginForm} from "components/LoginForm";

export const Login = () => {
    return (
        <div className={s.login}>
            <LoginForm/>
        </div>
    )
}