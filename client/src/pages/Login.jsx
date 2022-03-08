import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Container, Grid, Link } from "@mui/material";
import { LoginSharp } from "@mui/icons-material";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
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
              <Link href="/login" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Register!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
