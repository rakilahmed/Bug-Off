import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Box, Button, TextField, Card } from '@mui/material';
import { DeleteSharp } from '@mui/icons-material';

const Tickets = () => {
  const [listOfTickets, setListOfTickets] = useState([]);

  // const handleDelete = (id) => {
  //   Axios.delete(`http://localhost:8080/api/tickets/${id}`);
  //   // db.collection(`tickets`).doc(id).delete();
  // };
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:8080/api/tickets/${id}`).then(
      (res) => res.data
    );
    // db.collection(`tickets`).doc(id).delete();
  };

  useEffect(() => {
    Axios.get('http://localhost:8080/api/tickets').then((response) => {
      setListOfTickets(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        {listOfTickets.map((tick) => {
          return (
            <div>
              <Card variant="outlined">
                <Box sx={{ mt: 0, mb: 0 }} alignItems="center">
                  <Button
                    key={tick._id}
                    variant="contained"
                    color="warning"
                    // onClick={handleDelete(tick._id)}
                    startIcon={<DeleteSharp />}
                  ></Button>
                </Box>
                <h2>Name: {tick.submittedBy}</h2>
                <h2>Email: {tick.email}</h2>
                <h2>Assigne: {tick.assignedTo}</h2>
                <h2>Title: {tick.title}</h2>
                <h2>Summary: {tick.summary}</h2>
                <h2>DueDate: {tick.dueDate}</h2>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tickets;
