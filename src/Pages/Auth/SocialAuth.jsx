import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialAuth = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { googleSignIn } = useContext(AuthContext);

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "You are logged in!",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'top-end',
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'top-end',
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