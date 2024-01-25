import './styles/auth.scss'
export default function Login() {
    return (
        <div className="containerAuth">
            <form action="" className="auth">
                <h2>Login</h2>
                <input id="email" type="text" placeholder="Email"/>
                <input id="password" type="password" placeholder="Password"/>
                <button>Sing In</button>
            </form>
        </div>
    )
}

// <h3>Login</h3>
//
// <label htmlFor="username">Username</label>
// <input type="text" placeholder="Your name" id="username">
//
//     <label htmlFor="password">Password</label>
//     <input type="password" placeholder="Email" id="email">
//
//         <label htmlFor="password">Password</label>
//         <input type="password" placeholder="Password" id="password">
//             <button>Log In</button>