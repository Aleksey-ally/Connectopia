import s from './LoginForm.module.scss'

import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {useController, useForm} from "react-hook-form";
import {login} from "redux/authReducer";
import {useAppDispatch} from "redux/reduxStore";
import {Checkbox} from "components/Checkbox";
import {useState} from "react";
import {Typography} from "components/Typography";
import {toast} from "react-toastify";
import {infoOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {PropertiesLogin} from "api/autn/auth.types";

type FormValues = {
    email: string,
    password: number
    rememberMe: boolean
    captcha: string
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
    const [captchaUrl, setCaptchaUrl] = useState<string>('')

    const onSubmit = (data: PropertiesLogin) => {
        dispatch(login(data)).then((message) => {
            if (typeof message === "string") {
                setGeneralError(message); // Устанавливаем сообщение об ошибке
            } else if (typeof message === 'object') {
                setGeneralError(message.message)
                setCaptchaUrl(message.captchaUrl)
            } else {
                toast.info('You are welcome!', infoOptions); // Сообщение о капче или другом случае
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
        <div className={s.login}>
            <Typography variant="large" className={s.title}>
                Sign In
            </Typography>
            <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>

                <TextField type={'email'} label={'Email'}
                           {...register('email', {required: 'Email is required'})}
                           errorMessage={errors.email?.message}/>

                <TextField type={"password"} label={'Password'}
                           {...register('password', {
                               required: 'Password is required',
                               minLength: {value: 3, message: 'Min length 3'}
                           })}
                           errorMessage={errors.password?.message}/>

                <Checkbox label={'Remember me'} {...register('rememberMe')} onValueChange={onChange} checked={value}/>
                <img src={captchaUrl} alt=""/>
                {generalError && <Typography variant='error'>{generalError}</Typography>}
                {captchaUrl && <TextField type={'text'} {...register('captcha', {required: 'Captcha is required'})}
                                          errorMessage={errors.captcha?.message}/>}
                <Button type="submit" fullWidth variant={'tertiary'} className={s.button}>
                    Sign In
                </Button>
            </form>
        </div>

    )
}

