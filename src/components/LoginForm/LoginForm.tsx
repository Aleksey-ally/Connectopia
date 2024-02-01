import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {useForm} from "react-hook-form";

type FormValues = {
    login: string,
    password: string
}

export const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label={'Login'} {...register('login', {required:true})}></TextField>
            <TextField label={'Password'} {...register('password', {required:true})}></TextField>
            <Button type='submit'>Send</Button>
        </form>
    )
}