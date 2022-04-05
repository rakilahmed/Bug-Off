import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress style={{ color: '#333' }} />
    </div>
  );
};

export default Loading;
