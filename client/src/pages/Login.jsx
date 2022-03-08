import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid, Link } from "@mui/material";
import { LoginSharp } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Welcome to Bug Off</Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          fullWidth
          required
          margin="normal"
          id="email"
          name="email"
          label="Email Address"
        />
        <TextField
          fullWidth
          required
          margin="normal"
          type="password"
          id="password"
          name="password"
          label="Password"
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 1, mb: 2 }}
          startIcon={<LoginSharp />}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" varient="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
