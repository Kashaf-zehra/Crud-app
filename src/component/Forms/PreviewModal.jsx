import { Box, Modal, Typography } from '@mui/material';

const PreviewModal = ({ selectedData, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: '90%',
          maxHeight: '90%',
          overflowY: 'auto',
        }}
      >
        <Typography id='modal-modal-title' variant='h6'>
          Employee Data
        </Typography>
        <Typography variant='body1'>
          <strong>Name:</strong> {selectedData.name}
        </Typography>
        <Typography variant='body1'>
          <strong>Qualification:</strong> {selectedData.qualification}
        </Typography>
        <Typography variant='body1'>
          <strong>Designation:</strong> {selectedData.designation}
        </Typography>
        {selectedData.image && (
          <img
            src={URL.createObjectURL(selectedData.image)}
            alt='Uploaded'
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </Box>
    </Modal>
  );
};
export default PreviewModal;
