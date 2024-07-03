import React from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "./FirebaseSingIn/Firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = () => {
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
        <div className="title-container">
          <img src={require("./huella.png")} alt="PupMatch Logo" className="logo-image" />
          <Typography variant="h4" align="center" className="login-title">
            PupMatch
          </Typography>
        </div>
        <Typography variant="h4" className="page-title">Login</Typography>
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
              Sign in with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              className="login-button login-facebook"
              onClick={handleGoogleLogin}
            >
              Sign in with Facebook
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              className="login-button login-github"
              onClick={handleGoogleLogin}
            >
              Sign in with Github
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" className="login-footer">
              <Link to="/signup">Trouble Signing In?</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
