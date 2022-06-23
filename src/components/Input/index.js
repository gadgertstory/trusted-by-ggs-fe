import React from "react";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const Input = (props) => {
    const {
        value,
        label,
        name,
        placeholder,
        type,
        onChange,
        disabled,
        required,
        defaultValue,
        sx,
        className,
        autoComplete,
        error,
        fullWidth,
    } = props;
    return (
        <FormControl fullWidth={fullWidth} sx={sx}>
            <TextField
                error={!!error}
                label={label}
                variant="outlined"
                type={type}
                value={value}
                name={name}
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required={required}
                defaultValue={defaultValue}
                helperText={error ? error.message : null }
                size="small"
            />
        </FormControl>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.node,
    name:PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    className: PropTypes.string,
    defaultValue: PropTypes.node,
    error:PropTypes.bool,
    autoComplete:PropTypes.string
  };

export default Input;
