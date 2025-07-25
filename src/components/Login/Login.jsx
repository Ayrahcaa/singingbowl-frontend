import "./Login.scss";

const BACKEND_URL =
  process.env.REACT_APP_AUTH_URL || process.env.REACT_APP_API_URL;

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/google`;
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
