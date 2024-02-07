import s from './LoginForm.module.scss'

import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {useController, useForm} from "react-hook-form";
import {login} from "redux/authReducer";
import {PropertiesLogin} from "api/api.types";
import {useAppDispatch} from "redux/reduxStore";
import {Checkbox} from "components/Checkbox";

type FormValues = {
    email: string,
    password: number
    rememberMe: boolean
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {control, register, handleSubmit, formState: {errors}} = useForm<FormValues>()

    const onSubmit = (data: PropertiesLogin) => {
        dispatch((login(data)))
    }

    const {
        field: {value, onChange}
    } = useController({
        name: 'rememberMe',
        control,
        defaultValue: false,
    })

    return (
        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <TextField label={'Email'} {...register('email', {required: true})}></TextField>
            <TextField type={"password"} label={'Password'} {...register('password', {required: true})}></TextField>
            <Checkbox label={'Remember me'} {...register('rememberMe')} onValueChange={onChange} checked={value}/>
            <Button className={s.button} type='submit' fullWidth>Submit</Button>
        </form>
    )
}