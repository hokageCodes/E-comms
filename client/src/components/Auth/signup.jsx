import SignUpImg from '../../assets/signup.png'
import GoogleOAuth from '../../assets/Google.svg'
export default function Signup() {
    return (
        <div>
            <div className="left-signup">
                <img src={SignUpImg} alt='' />
            </div>
            <div className="right-signup">
                <div className="right-top">
                    <h2>Sign In Page</h2>
                    <div className="googleAuth">
                        <img src={GoogleOAuth} alt='' />
                        <a href="#/">Continue With Google</a>
                    </div>
                </div>
                <div className="or">
                    <hr /> OR 
                    <hr />
                </div>
                <div className="signup-details">
                    <div className="email">
                        <label>Username or Email address</label>
                        <input type='text' />
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input type='text' />
                    </div>
                </div>
            </div>
        </div>
    )
}
