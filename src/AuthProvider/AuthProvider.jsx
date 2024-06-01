import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React from "react";
  import { useEffect } from "react";
  import { useState } from "react";
  import { createContext } from "react";
  import auth from "./../firebase/firebase.config";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import { ToastContainer } from "react-toastify";
  
  import "react-toastify/dist/ReactToastify.css";
  import axios from "axios";
  
  export const AuthContext = createContext(null);
  
  // aos package initialize
  AOS.init();
  AOS.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
  
    offset: 120,
    delay: 0,
    duration: 800,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });
  
  const AuthProvider = ({ children }) => {
    // const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const emailPasswordRegister = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
    const emailPasswordLogIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const userUpdateProfile = (displayName, photoURL) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
    };
    const logOut = async () => {
      setLoading(true);
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        withCredentials: true,
      });
      return signOut(auth);
    };
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // console.log(currentUser);
          setUser(currentUser);
          setLoading(false);
        } else {
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
            withCredentials: true,
          });
          setUser(null);
  
          setLoading(false);
        }
      });
      return () => unSubscribe();
    }, []);
    const authInfo = {
      emailPasswordRegister,
      emailPasswordLogIn,
      googleLogin,
      setLoading,
      loading,
      user,
      userUpdateProfile,
      setUser,
      logOut,
    };
    return (
      <div>
        <AuthContext.Provider value={authInfo}>
          {children} <ToastContainer />
        </AuthContext.Provider>
      </div>
    );
  };
  
  export default AuthProvider;
  