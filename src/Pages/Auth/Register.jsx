import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
  // get createUser function from AuthContext
  const { createUser } = useContext(AuthContext);

  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    // create user with email and password and then update name
    createUser(email, password).then((res) => {
        console.log(res.user);
      profileName(res.user, name);
    });
  };
  // update name
  const profileName = (currentUser, name) => {
    updateProfile(currentUser, { displayName: name });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col justify-between lg:flex-row">
        <div className="text-center lg:text-left md:w-1/2">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
              />
            </div>
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
            </div>
            <button className="btn mt-2">Register Now</button>
          </form>
          <p className="text-center p-4">
            <small>
              {" "}
              <Link to="/login">Already Have an Account?</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
