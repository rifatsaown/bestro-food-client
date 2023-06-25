import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
  // get createUser function from AuthContext
  const {user, createUser } = useContext(AuthContext);
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, name, pass }) => {
    console.log(email, name, pass);
    createUser(email, pass)
      .then((result) => {
        profileName(result.user, name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update name
  const profileName = (currentUser, name) => {
    updateProfile(currentUser, { displayName: name });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col justify-between lg:flex-row">
        <div className="text-center lg:text-left md:w-1/2">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            {
              user ? (
                <span>
                  {user.displayName && <span>Welcome {user.displayName}</span>}
                </span>
              ) : (
                <span>You are not logged in</span>
              )
            }
          </p>
        </div>
        <div className="card md:w-1/2 max-w-lg shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("pass", { required: true , minLength: 6 })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.pass && <span className="text-red-500">Password Must be atlast 6 Carrecter</span>}
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
