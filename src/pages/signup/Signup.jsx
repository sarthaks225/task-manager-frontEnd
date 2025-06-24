import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSignupStore } from "../../stores/auth/signupStore"; // <-- import your zustand store

const SignUp = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const { success, message, signupUser, resetSignupUser, loading } =
    useSignupStore(); // <-- use the store

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "M",
  });
  const [errors, setErrors] = useState({});

  const tagLine = "Smart Scheduling, Seamless Execution.";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};
    if (!form.firstName) temp.firstName = "First name required";
    if (!form.lastName) temp.lastName = "Last name required";
    if (!form.email) temp.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      temp.email = "Invalid email";
    if (!form.password) temp.password = "Password required";
    if (form.password !== form.confirmPassword)
      temp.confirmPassword = "Passwords do not match";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Call the zustand store's

    await signupUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      gender: form.gender,
    });
  };

  useEffect(() => {
    if (message) {
      alert(message);
    }

    if (success) {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "M",
      });
      navigate("/login");
    }
    resetSignupUser();
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
          height: "100%",
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
            Register for Task Manager ⌛
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                margin="normal"
              />
            </Box>
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
            <Box sx={{ display: "flex", gap: 2 }}>
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
                autoComplete="new-password"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
                margin="normal"
                type="password"
                autoComplete="new-password"
              />
            </Box>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={form.gender === "M"}
                      onChange={handleChange}
                      value="M"
                      name="gender"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={form.gender === "F"}
                      onChange={handleChange}
                      value="F"
                      name="gender"
                    />
                  }
                  label="Female"
                />
              </Box>
            </FormControl>

            {/* {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )} */}
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
              Register
            </Button>
            <Typography sx={{ p: 2, color: "#9D9D9D", textAlign: "center" }}>
              OR
            </Typography>
            <Box sx={{ color: "#9D9D9D", textAlign: "center" }}>
              Already have an account? &nbsp;
              <Link
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  border: "none",
                }}
              >
                Login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SignUp;
