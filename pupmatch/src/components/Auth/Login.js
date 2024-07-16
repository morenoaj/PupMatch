import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../FirebaseSingIn/Firebase.js";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
        navigate("/swipe");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="login-background">
      <div className="title-container">
        <div className="login-container">
          <img src={pawIcon} alt="Paw Icon" className="paw-icon" />
          <h1 className="page-title">PupMatch</h1>

          <p className="login-subtitle">
            By tapping Create Account or Sign In, you agree to our{" "}
            <Link to="/terms">Terms</Link>. Learn how we process your data in our{" "}
            <Link to="/privacy">Privacy Policy</Link> and{" "}
            <Link to="/cookies">Cookies Policy</Link>.
          </p>
          <button className="login-button google" onClick={handleGoogleLogin}>
            SIGN IN WITH GOOGLE
          </button>
          <button className="login-button facebook">
            SIGN IN WITH FACEBOOK
          </button>
          <Link to="/registerUser" className="create-account-link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
