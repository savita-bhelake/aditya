"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";

const defaultTheme = createTheme();

const Login = () => {
  const session = useSession();
  console.log(session);
  const router = useRouter();

  const handleGoogle = async () => {
    await signIn("google");
    router.push("./home");
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // check in activity

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");
    if (expireTime < Date.now()) {
      setIsLoggedIn(false);
    }
  };
  const updateExpireTime = () => {
    const expireTime = Date.now() + 10000;
    localStorage.setItem("expireTime", expireTime);
  };
  // check inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity;
    }, 5000);

    // clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  // update expire time
  useEffect(() => {
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("mousedown", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("mouseover", updateExpireTime);

    return () => {
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("mousedown", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
      window.addEventListener("mouseover", updateExpireTime);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Card sx={{ elevation: 12, p: 2, mt: 4 }}>
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                LogIn
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => router.push("./home")}
                >
                  Log In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleGoogle}
                >
                  Sign In with Google
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
