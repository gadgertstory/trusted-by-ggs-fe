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
        rows,
        helperText,
        multiline,
        inputProps,
        pattern
    } = props;
    return (
        <FormControl fullWidth={fullWidth} sx={sx}>
            <TextField
                error={error}
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
                helperText={helperText}
                size="small"
                rows={rows}
                autoComplete={autoComplete}
                multiline={multiline}
                inputProps={inputProps}
                pattern={pattern}
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
    autoComplete:PropTypes.string,
    fullWidth:PropTypes.bool,
    rows:PropTypes.number,
    inputProps:PropTypes.object,
    pattern:PropTypes.string,
  };

export default Input;
