
export default function About() {
    return (
        <div className="container">
            <br></br>
            <h2>Login</h2>
            <br></br>

            {/* Login Form */}
            <form id="loginForm">
                <div className="input-field">
                    <label>Username</label>
                    <br></br>
                    <input type="text" id="username" placeholder="Username" required></input>
                </div>
                <br></br>
                <div className="input-field">
                    <label>Password</label>
                    <br></br>
                    <input type="password" id="password" placeholder="********" required></input>
                </div>
                <br></br>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    )
}