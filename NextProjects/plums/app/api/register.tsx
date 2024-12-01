export default function Register() {
    return (
        <div className="container">
            <h2>Registration</h2>
            
            {/* Registration Form */}
            <form id="registrationForm">
                <div className="input-field">
                    <input type="text" id="username" placeholder="Username" required />
                </div>
                <div className="input-field">
                    <input type="email" id="email" placeholder="Email" required />
                </div>
                <div className="input-field">
                    <input type="password" id="password" placeholder="Password" required />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    )
}