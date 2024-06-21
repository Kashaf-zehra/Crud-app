import React, { useState } from 'react';
import { Button, Box, Modal, Typography, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FileUploadField from './FileUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddDataModal = ({ open, handleClose, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    qualification: Yup.string().required('Qualification is required'),
    designation: Yup.string().required('Designation is required'),
    image: Yup.mixed().required('Required'),
  });

  const initialValues = {
    name: '',
    qualification: '',
    designation: '',
    image: null,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Employee
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name='name'
                  label='Name'
                  fullWidth
                  margin='normal'
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  name='qualification'
                  label='Qualification'
                  fullWidth
                  margin='normal'
                  error={touched.qualification && Boolean(errors.qualification)}
                  helperText={touched.qualification && errors.qualification}
                />
                <Field
                  as={TextField}
                  name='designation'
                  label='Designation'
                  fullWidth
                  margin='normal'
                  error={touched.designation && Boolean(errors.designation)}
                  helperText={touched.designation && errors.designation}
                />
                <FileUploadField name='image' />

                {/* <input type='file' name='image' onChange={handleChange} /> */}
                {/* <img src={file} 
                /> */}
                {/* <Field name='image' component={FileUploadField} /> */}

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default AddDataModal;
