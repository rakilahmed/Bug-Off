import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Container, Grid, Link } from "@mui/material";
import { HowToRegSharp } from "@mui/icons-material";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Bug Off logo" />
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            required
            margin="normal"
            id="name"
            name="name"
            label="Name"
          />
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
          <TextField
            fullWidth
            required
            margin="normal"
            type="password"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
          />
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<HowToRegSharp />}
            onClick={handleRegister}
          >
            REGISTER
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
