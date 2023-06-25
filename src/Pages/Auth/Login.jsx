import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const [disabled, setDisabled] = useState(true);

  const { user, signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";


  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You are logged in!",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  const handlevalidateCaptcha = (e) => {
    const captcha = e.target.value;
    if (validateCaptcha(captcha)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col justify-between lg:flex-row">
        <div className="text-center lg:text-left md:w-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            {user ? (
              <span>
                {user.displayName && <span>Welcome {user.displayName}</span>}
              </span>
            ) : (
              <span>Please Login</span>
            )}
          </p>
        </div>
        <div className="card md:w-1/2 max-w-lg shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
              />
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  onBlur={handlevalidateCaptcha}
                  placeholder="Type Captcha"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button disabled={disabled} className="btn ">
                Login
              </button>
            </div>
          </form>
          <p className="text-center p-4">
            <small>
              New Here? <Link to="/register">Create an Account?</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
