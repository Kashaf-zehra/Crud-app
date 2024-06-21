import { Button } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const FileUploadField = ({ name }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
  };
  return (
    <>
      <Button
        variant='outlined'
        component='label'
        sx={{ margin: 'normal', display: 'block', mt: 2 }}
      >
        Upload Image
        <input type='file' hidden onChange={handleChange} />
      </Button>
      {touched[name] && errors[name] ? (
        <div style={{ color: 'red', fontSize: '12px' }}>{errors[name]}</div>
      ) : null}
      {values[name] && (
        <div>
          <strong>Selected File:</strong> {values[name].name}
        </div>
      )}
    </>
  );
};

export default FileUploadField;
