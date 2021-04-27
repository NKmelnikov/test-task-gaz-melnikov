import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

function InputWaterAmount({ value, error, helperText, formikChange }) {
  return (
    <FormControl className="x-form__fc waterAmount">
      <TextField
        id="addressInput"
        name={"waterAmount"}
        label="Кол-во воды в тоннах"
        value={value}
        error={error}
        helperText={helperText}
        onChange={formikChange}
      />
    </FormControl>
  );
}

InputWaterAmount.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  formikChange: PropTypes.func.isRequired,
};

export default InputWaterAmount;
