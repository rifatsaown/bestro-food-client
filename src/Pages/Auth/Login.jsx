import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const captchaRef = useRef(null); 
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  };

  const handlevalidateCaptcha = () => {
    const captcha = captchaRef.current.value;
    if (validateCaptcha(captcha)) {
        setDisabled(false);
        captchaRef.current.value = '';
    } else {
        setDisabled(true);
        captchaRef.current.value = '';
        alert('Invalid Captcha');
    }

    }


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col justify-between lg:flex-row">
        <div className="text-center lg:text-left md:w-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
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
              <div className='form-control'>
              <label className="label">
                <LoadCanvasTemplate/>
              </label>
                <input
                    type="text"
                    name="captcha"
                    ref = {captchaRef}
                    placeholder="Type Captcha"
                    className="input input-bordered"
                />
                <a onClick={handlevalidateCaptcha} className='btn btn-xs btn-accent btn-outline'>Validate</a>
              </div>
            </div>
            <div className="form-control mt-6">
              <button disabled={disabled} className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
