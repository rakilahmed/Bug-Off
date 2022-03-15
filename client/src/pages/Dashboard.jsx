import { Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Tickets } from '../components/Tickets';

const Dashboard = () => {
  return (
    <Container>
      <Header />
      <Tickets />
      <Footer />
    </Container>
  );
};

export default Dashboard;
