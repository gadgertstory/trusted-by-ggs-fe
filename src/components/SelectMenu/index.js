import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const SelectMenu = (props) => {
  const { id, list, label, value, onChange, fullWidth, sx, error, helperText, disabled, size } =
    props;

  return (
    <FormControl fullWidth={fullWidth} error={error} sx={{ minWidth: '150px',backgroundColor:'white' }}>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Select
        sx={sx}
        labelId='select-label'
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
        size={size}
      >
        {list.map((item) => {
          return (
            <MenuItem key={`menu-${item.status_id}`} value={item.status_id}>
              {item.status_name}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

SelectMenu.propTypes = {
  id: PropTypes.string,
  props: PropTypes.object,
  list: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

SelectMenu.defaultProps = {
  size: 'small',
};

export default SelectMenu;
