import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddDataModal from './Profile';
import DisplayData from './Displaydata';

const FormData = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const newData = { ...values, id: formData.length + 1 };
    setFormData([...formData, newData]);
    resetForm();
    setSubmitting(false);
    handleClose();
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Employee
      </Button>
      <AddDataModal
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />
      {formData && (
        <DisplayData
          data={formData}
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default FormData;
