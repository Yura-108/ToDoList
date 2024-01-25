import './styles/header.scss'
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isAuthSelector, logout} from "../redux/slices/userSlice.js";

export default function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);

    const onClickLogout = () => {
        if (window.confirm('Are you sure want to log')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    }
    return (
        <header>
                <h1 className="mainTitle"><Link to="/">ToDoList</Link></h1>
                <div className="auth">
                    {isAuth &&
                        <>
                            <Link to='/tasks'>My tasks</Link>
                            <button className="btn btn-secondary logout" onClick={() => onClickLogout()}>Log out</button>
                        </>
                    }
                    {!isAuth &&
                        <>
                            <Link className="btn btn-success" to="/login">Sing in</Link>
                            <Link style={{marginLeft: "15px"}} className="btn btn-primary" to="/Registration">Sing up</Link>
                        </>
                    }

                </div>

        </header>
    )
}