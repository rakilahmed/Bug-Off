import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid, Link } from "@mui/material";
import { HowToRegSharp } from "@mui/icons-material";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/login");
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth required id="name" name="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="email"
              name="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="password"
              id="password"
              name="password"
              label="Password"
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 1, mb: 2 }}
          startIcon={<HowToRegSharp />}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Login
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;
