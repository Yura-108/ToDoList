import './styles/auth.scss'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchUserData, isAuthSelector} from "../redux/slices/userSlice.js";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";
export default function Login() {
    const isAuth =  useSelector(isAuthSelector);
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values))

        if (!data.payload) {
            return alert('Failed to log in!')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        } else {
            return alert('Failed to log in!')
        }
    }

    if (isAuth) {
        return <Navigate to='/tasks' />
    }

    return (
        <div className="containerAuth">
            <form method="POST" className="auth" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <input {...register('email', {required: 'Enter email'})} id="email" type="text" placeholder="Email"/>
                <label htmlFor="email">{errors.email?.message}</label>
                <input {...register('password', {required: 'Enter password'})} id="password" type="password" placeholder="Password"/>
                <label htmlFor="password">{errors.password?.message}</label>
                <button disabled={!isValid} type="submit">Sing In</button>
            </form>
        </div>
    )
}
