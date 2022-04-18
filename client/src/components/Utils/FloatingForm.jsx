import { Box, Button, Modal } from '@mui/material';
import TaskForm from '../Tasks/TaskForm';
import TicketForm from '../Tickets/TicketForm';

const FloatingForm = ({
  forTask = false,
  newTicket = false,
  floatingForm = false,
  ticket,
  task,
  closeForm,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '32rem',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
    p: 2.5,
  };

  return (
    <Box>
      <Modal
        keepMounted
        open={floatingForm}
        onClose={closeForm}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              mb: 2,
            }}
            onClick={closeForm}
          >
            Close
          </Button>

          {forTask ? (
            <TaskForm floatingForm closeForm={closeForm} task={task} />
          ) : newTicket ? (
            <TicketForm newTicket floatingForm closeForm={closeForm} />
          ) : (
            <TicketForm floatingForm closeForm={closeForm} ticket={ticket} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default FloatingForm;
