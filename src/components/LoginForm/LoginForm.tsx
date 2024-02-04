import s from './LoginForm.module.scss'

import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {useForm} from "react-hook-form";
import {login} from "redux/authReducer";
import {PropertiesLogin} from "api/api.types";
import Checkbox from "antd/es/checkbox/Checkbox";
import {useAppDispatch} from "redux/reduxStore";

type FormValues = {
    email: string,
    password: number
    rememberMe: boolean
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>()

    const onSubmit = (data: PropertiesLogin) => {
        dispatch((login(data)))
    }

    return (
        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <TextField label={'Email'} {...register('email', {required: true})}></TextField>
            <TextField label={'Password'} {...register('password', {required: true})}></TextField>
            <Checkbox {...register('rememberMe')}/>
            <Button className={s.button} type='submit' fullWidth>Send</Button>
        </form>
    )
}