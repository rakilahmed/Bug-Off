import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { Grid } from '@mui/material';
import { Header, Footer } from '../components';
import { Tickets } from '../components/Tickets';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <>
      <Header />
      <Grid
        container
        spacing={{ md: 3, xs: 2 }}
        columns={{ xs: 4, sm: 8, md: 8 }}
      >
        <Grid item xs={4}>
          <Tickets />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Dashboard;
