import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import PreviewModal from './PreviewModal';
import FileUploadField from './FileUpload';
const DisplayData = ({ data, setFormData }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleRowClick = (employee) => {
    setSelectedData(employee);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
    setOpenEditForm(false);
  };
  const handleDelete = (employeeId) => {
    setFormData((prevData) => prevData.filter((emp) => emp.id !== employeeId));
  };
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditForm(true);
  };
  const updateEmployee = (updatedEmployee) => {
    // Update the state or make an API call to update the employee
    // This is where you would typically update your data in the backend
    console.log('Updating employee:', updatedEmployee);
    // Example: setFormData to update the state with the updated employee
    setFormData((prevData) =>
      prevData.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };
  const handleUpdate = () => {
    updateEmployee(selectedEmployee); // Replace with your actual update logic
    handleClose();
  };
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedEmployee((prev) => ({
      ...prev,
      image: file,
    }));
  };
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant='h6'>Team Members</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: 'flex', mx: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='h6'>Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Qualification</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Designation</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Image</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.qualification}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>
                      {employee.image && (
                        <img
                          src={URL.createObjectURL(employee.image)}
                          alt='Uploaded'
                          style={{ width: 50, height: 50 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(employee.id)}>
                        <DeleteIcon />
                      </Button>
                      <Button onClick={() => handleEdit(employee)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleRowClick(employee)}>
                        <RemoveRedEyeIcon />
                      </Button>

                      {/* You can add an edit button here similarly */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Modal
          open={openEditForm}
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
              maxWidth: '95vw',
              maxHeight: '95vh',
              overflowY: 'auto',
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Edit Employee
            </Typography>
            <TextField
              name='name'
              label='Name'
              fullWidth
              margin='normal'
              value={selectedEmployee?.name}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              name='qualification'
              label='Qualification'
              fullWidth
              margin='normal'
              value={selectedEmployee?.qualification}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  qualification: e.target.value,
                }))
              }
            />
            <TextField
              name='designation'
              label='Designation'
              fullWidth
              margin='normal'
              value={selectedEmployee?.designation}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  designation: e.target.value,
                }))
              }
            />
            <Button
              variant='contained'
              component='label'
              fullWidth
              sx={{ margin: 'normal', display: 'block', mt: 2 }}
            >
              Upload Image
              <input type='file' hidden onChange={handleImageChange} />
            </Button>
            {selectedEmployee?.image && (
              <div>
                <strong>Selected File:</strong> {selectedEmployee.image.name}
              </div>
            )}
            <Button
              type='button'
              variant='contained'
              color='primary'
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Box>
        </Modal>
      </Grid>
      {selectedData && (
        <PreviewModal
          selectedData={selectedData}
          open={open}
          handleClose={handleClose}
        />
      )}
    </Paper>
  );
};
export default DisplayData;
