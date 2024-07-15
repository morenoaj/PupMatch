import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../FirebaseSingIn/Firebase.js";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import setDoc to add new users
import { db } from "../FirebaseSingIn/Firebase.js";
import "./Login.css";
import pawIcon from "../Assets/paw.png";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // El usuario no existe en Firestore, agregarlo a la base de datos
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
        });
        // Redirigir a la pantalla de registro de usuario
        navigate("/petProfile");
      } else {
        // El usuario ya existe en Firestore, redirigir a la pantalla de inicio
        navigate("/editProfile");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
        <h1 className="page-title">PupMatch</h1>

        <p className="login-subtitle">
          By tapping Create Account or Sign In, you agree to our{" "}
          <a href="/terms">Terms</a>. Learn how we process your data in our{" "}
          <a href="/privacy">Privacy Policy</a> and
          <a href="/cookies">Cookies Policy</a>.
        </p>
        <button className="login-button google" onClick={handleGoogleLogin}>
          SIGN IN WITH GOOGLE
        </button>
        {/* //<button className="login-button facebook" onClick={handleFacebookLogin}> */}
        <button className="login-button facebook">SIGN IN WITH FACEBOOK</button>
        <a href="/registerUser" className="create-account-link">
          Create Account
        </a>
      </div>
    </div>
  );
};

export default Login;
