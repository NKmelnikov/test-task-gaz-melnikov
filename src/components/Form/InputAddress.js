import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

function InputAddress({ value, error, helperText, formikChange }) {
  return (
    <FormControl className="x-form__fc address">
      <TextField
        id="addressInput"
        name={"address"}
        label="Адрес"
        value={value}
        error={error}
        helperText={helperText}
        onChange={formikChange}
      />
    </FormControl>
  );
}

InputAddress.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  formikChange: PropTypes.func.isRequired,
};

export default InputAddress;
