import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth/authStore"; // <-- update path as needed

const Login = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const { login, success, message, resetUseAuthStore, loading } =
    useAuthStore(); // <-- use your zustand login store

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const tagLine = "Smart Scheduling, Seamless Execution.";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};
    if (!form.email) temp.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      temp.email = "Invalid email";
    if (!form.password) temp.password = "Password required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await login({
      email: form.email.trim(),
      password: form.password,
    });
  };

  useEffect(() => {
    if (success) {
      console.log("Login successful, redirecting...");
      setForm({ email: "", password: "" });
      navigate("/dashboard"); // or wherever you want to redirect
    }
    if (message) {
      alert(message);
    }

    resetUseAuthStore();
  }, [message, success]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        height: "auto",
        bgcolor: theme.palette.primary.main,
        ml: 1,
        borderTopLeftRadius: lgUp ? "25pt" : "",
        borderBottomLeftRadius: lgUp ? "25pt" : "",
      }}
    >
      {/* Side tag line */}
      <Box
        sx={{
          display: lgUp ? "block" : "none",
          width: "25%",
          height: "100%",
          p: 2,
          background: "transparent",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ p: 2, textAlign: "left" }}>
          <Typography
            variant="h2"
            sx={{
              py: 2,
              color: "white",
              fontSize: "28pt",
              wordSpacing: 2,
              letterSpacing: 2,
              fontFamily: "sans-serif",
            }}
          >
            {tagLine}
          </Typography>
        </Box>
      </Box>

      {/* Form white box */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: lgUp ? "75%" : "100%",
          // height: "100%",
          background: "white",
          borderTopLeftRadius: lgUp ? "25pt" : "",
          borderBottomLeftRadius: lgUp ? "25pt" : "",
          boxSizing: "border-box",
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: smUp ? "450px" : "90vw",
            p: 4,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: "20pt",
              py: 2,
              textAlign: "center",
            }}
          >
            Login to Task Manager 🔐
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
              type="email"
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
              type="password"
              autoComplete="current-password"
            />

            {success && (
              <Typography color="primary" sx={{ mt: 2, textAlign: "center" }}>
                {success}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                fontWeight: "bold",
                fontSize: "15px",
                bgcolor: theme.palette.primary.main,
              }}
            >
              Login
            </Button>
            <Typography sx={{ p: 2, color: "#9D9D9D", textAlign: "center" }}>
              OR
            </Typography>
            <Box sx={{ color: "#9D9D9D", textAlign: "center" }}>
              Don’t have an account? &nbsp;
              <Link
                to="/signup"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  border: "none",
                }}
              >
                Register
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
