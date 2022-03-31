import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { Header, TicketProvider, AllTickets } from '../components/';

const Tickets = () => {
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
      <TicketProvider>
        <AllTickets />
      </TicketProvider>
    </>
  );
};

export default Tickets;
