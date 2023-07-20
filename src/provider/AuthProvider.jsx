import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

// Create Auth Context
export const AuthContext = createContext(null);
// Get auth functions from firebase
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // State to store user details and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update name and photo
  const updateProfilename = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // get and set jwt token in local storage with axios
      const userEmail = user?.email;
      if (user) {
        axios
          .post("https://bistro-boss-server-snowy-three.vercel.app/jwt", {
            email: userEmail,
          })
          .then((res) => {
            localStorage.setItem("JWT-token", res.data.token);
            setLoading(false);
          });
      } else {
        setLoading(false);
        localStorage.removeItem("JWT-token");
      }
    });
    // Unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  // authinfo object to be passed as value to the provider
  const authInfo = {
    user,
    loading,
    googleSignIn,
    createUser,
    updateProfilename,
    signIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
