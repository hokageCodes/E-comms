import { useState } from 'react';
import SignUpImg from '../../assets/signin.png';
import GoogleOAuth from '../../assets/Google.svg';
import './auth.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [backendError, setBackendError] = useState('');

    // Disable the signup button until both checkboxes are checked
    const isSignupDisabled = !termsAgreed;

    const handleSignup = async (event) => {
        event.preventDefault();
        setBackendError('');

    try {
      // You can perform additional actions here after successful signup, like redirecting to another page.
        window.location.href = '/'; // Redirect to "/"
    } catch (error) {
        setBackendError(error.message);
    }
};


  return (
    <>

      <div className="signup-container">
        <div className="left-signup">
          <img src={SignUpImg} alt="" />
        </div>
        <div className="right-signup">
          <div className="right-top">
            <div className="right-top-heading">
              <h2>Sign Up</h2>
              <p>Sign up for free to access any of our products</p>
            </div>
            <div className="googleAuth">
              <img src={GoogleOAuth} alt="" />
              <button>Continue With Google</button>
            </div>
          </div>
          <hr />
          <div className="signup-details">
            <div className="email">
              <label>Email Address</label>
              <input
                type="text"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>
            <div className="terms">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
              <p>
                Agree to our <span>Terms of Use</span> and <span>Privacy Policy</span>
              </p>
            </div>
            <div className="newsletterr">
              <input type="checkbox" />
              <p>Subscribe to our monthly newsletter</p>
            </div>
          </div>
          {backendError && <p className="error">{backendError}</p>}
          <div className="main-auth-button">
            <button onClick={handleSignup} disabled={isSignupDisabled}>
              Sign Up
            </button>
            <p>
              Already have an account? <span>Log in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
