import './styles/header.scss'
import { Link} from "react-router-dom";

export default function Header() {
    return (
        <header>
                <h1 className="mainTitle"><Link to="/">ToDoList</Link></h1>
                <div className="auth">
                    <Link to="/login">Sing in</Link>
                    <Link to="/Registration">Sing up</Link>
                </div>

        </header>
    )
}