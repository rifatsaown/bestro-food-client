import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import SocialAuth from "./SocialAuth";

const Register = () => {
  // get createUser function from AuthContext
  const { user, createUser, updateProfilename } = useContext(AuthContext);
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, name, pass, photo }) => {
    createUser(email, pass)
      .then(() => {
        updateProfilename(name, photo).then(() => {
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("JWT-token")}`,
            },
            body: JSON.stringify({
              name: name,
              email: email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Register Success",
                  text: "You have successfully registered",
                });
                navigate("/", { replace: true });
              }
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.message,
        });
      });
  };

  // update name

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col justify-between lg:flex-row">
        <div className="text-center lg:text-left md:w-1/2">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            {user ? (
              <span>
                {user.displayName && <span>Welcome {user.displayName}</span>}
              </span>
            ) : (
              <span>You are not logged in</span>
            )}
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
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photo", { required: true })}
                className="input input-bordered"
              />
              {errors.photo && (
                <span className="text-red-500">This field is required</span>
              )}
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
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("pass", { required: true, minLength: 6 })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.pass?.type === "required" && (
                <span className="text-red-500">This field is required</span>
              )}
              {errors.pass?.type === "minLength" && (
                <span className="text-red-500">
                  Password Must be atlast 6 Carrecter
                </span>
              )}
            </div>
            <button className="btn mt-2">Register Now</button>
            <div className="divider"></div>
            <SocialAuth>Register</SocialAuth>
          </form>
          <p className="text-center p-4">
            <small>
              <Link to="/login">Already Have an Account?</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
