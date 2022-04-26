import { Box, Button, Modal } from '@mui/material';
import TaskForm from '../Tasks/TaskForm';
import TicketForm from '../Tickets/TicketForm';
import EmployeeForm from '../Employees/EmployeeForm';

const FloatingForm = ({
  forTask = false,
  newTicket = false,
  newEmployee = false,
  floatingForm = false,
  ticket,
  task,
  employee,
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

          {newEmployee && !ticket && !task && (
            <EmployeeForm newEmployee floatingForm closeForm={closeForm} />
          )}
          {employee && !ticket && !task && (
            <EmployeeForm
              employee={employee}
              floatingForm
              closeForm={closeForm}
            />
          )}
          {newTicket && !employee && !task && (
            <TicketForm newTicket floatingForm closeForm={closeForm} />
          )}
          {ticket && !employee && !task && (
            <TicketForm ticket={ticket} floatingForm closeForm={closeForm} />
          )}
          {forTask && !ticket && !employee && (
            <TaskForm task={task} floatingForm closeForm={closeForm} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default FloatingForm;
