import {useDispatch, useSelector} from "react-redux";
import {fetchRegistration, isAuthSelector} from "../redux/slices/userSlice.js";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export default function Registration() {
    const isAuth =  useSelector(isAuthSelector);
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegistration(values))

        if (!data.payload) {
            return alert('Failed to register!')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to='/tasks' />
    }


    return (
        <div className="containerAuth">
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="auth" style={{height: "400px"}}>
                <h2>Registration</h2>
                <input {...register('fullName', {required: 'Enter your name'})} id="username" type="text" placeholder="Your name"/>
                <label htmlFor="fullName">{errors.fullName?.message}</label>
                <input {...register('email', {required: 'Enter email'})} id="email" type="text" placeholder="Email"/>
                <label htmlFor="email">{errors.email?.message}</label>
                <input {...register('password', {required: 'Enter password'})} id="password" type="password" placeholder="Password"/>
                <label htmlFor="password">{errors.password?.message}</label>
                <button disabled={!isValid} type="submit">Sing Up</button>
            </form>
        </div>
    )
}