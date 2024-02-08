import s from './LoginForm.module.scss'

import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {useController, useForm} from "react-hook-form";
import {login} from "redux/authReducer";
import {PropertiesLogin} from "api/api.types";
import {useAppDispatch} from "redux/reduxStore";
import {Checkbox} from "components/Checkbox";
import {useState} from "react";
import {Typography} from "components/Typography";

type FormValues = {
    email: string,
    password: number
    rememberMe: boolean
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {
        control,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({
        mode: 'onTouched',
    })

    const [generalError, setGeneralError] = useState<string>('')

    const onSubmit = (data: PropertiesLogin) => {
        dispatch(login(data)).then((message) => {
            if (message) {
                setGeneralError(message)
            }
        })
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
            <TextField label={'Email'}

                       {...register('email', {required: 'Email is required'})}
                       errorMessage={errors.email?.message}/>

            <TextField type={"password"} label={'Password'}
                       {...register('password', {
                           required: 'Password is required',
                           minLength: {value: 3, message: 'Min length 3'}
                       })}
                       errorMessage={errors.password?.message}/>

            <Checkbox label={'Remember me'} {...register('rememberMe')} onValueChange={onChange} checked={value}/>
            {generalError && <Typography variant='error'>{generalError}</Typography>}
            <Button className={s.button} type='submit' fullWidth>Submit</Button>
        </form>
    )
}