import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update name and photo
  const updateProfile = ( name, photo) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
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
      setLoading(false);
    });
    // Unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  // authinfo object to be passed as value to the provider
  const authInfo = {
    user,
    loading,
    createUser,
    updateProfile,
    signIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
