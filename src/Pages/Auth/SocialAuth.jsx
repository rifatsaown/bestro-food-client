import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const SocialAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(({ user }) => {
        fetch("https://bistro-boss-server-snowy-three.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              icon: "success",
              title: `${children} Success`,
              text: `Welcome ${user.displayName}`,
            });
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
        });
      });
  };

  return (
    <div>
      <a onClick={handleGoogleSignIn} className="btn btn-accent w-full">
        <FaGoogle /> {children} with google
      </a>
    </div>
  );
};

export default SocialAuth;
