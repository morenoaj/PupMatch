import React from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "./FirebaseSingIn/Firebase.js";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

const SignUp = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-background">
      <Container maxWidth="xs" className="login-container">
        <Typography variant="h4" className="page-title">Sign Up</Typography>
        <div className="title-container">
          <img src={require("./huella.png")} alt="PupMatch Logo" className="logo-image" />
          <Typography variant="h4" align="center" className="login-title">
            PupMatch
          </Typography>
        </div>
        <Typography variant="body2" align="center" className="login-subtitle">
          By tapping Create Account or Sign In, you agree to our <Link to="#">Terms</Link>. Learn how we process your data in our <Link to="#">Privacy Policy</Link> and <Link to="#">Cookies Policy</Link>.
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              className="login-button login-google"
              onClick={handleGoogleLogin}
            >
              Sign up with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              className="login-button login-facebook"
              onClick={handleGoogleLogin}
            >
              Sign up with Facebook
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              className="login-button login-github"
              onClick={handleGoogleLogin}
            >
              Sign up with Github
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" className="login-footer">
              <Link to="/">Already have an account? Sign in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
