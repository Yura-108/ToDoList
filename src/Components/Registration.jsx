export default function Registration() {
    return (
        <div className="containerAuth">
            <form action="" className="auth" style={{height: "360px"}}>
                <h2>Registration</h2>
                <input id="username" type="text" placeholder="Your name"/>
                <input id="email" type="text" placeholder="Email"/>
                <input id="password" type="password" placeholder="Password"/>
                <button>Sing Up</button>
            </form>
        </div>
    )
}