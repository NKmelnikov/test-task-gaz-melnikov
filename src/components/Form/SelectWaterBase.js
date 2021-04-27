import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';

function SelectWaterBase({
  waterBaseData,
  value,
  error,
  helperText,
  formikChange,
}) {
  return (
    <FormControl className="x-form__fc waterBase">
      <InputLabel id="waterBaseSelectLabel">Выберите водобазу</InputLabel>
      <Select
        disabled={waterBaseData.length === 0}
        id="waterBaseSelect"
        labelId="waterBaseSelectLabel"
        name={"waterBase"}
        value={value}
        error={error}
        onChange={formikChange}
      >
        {waterBaseData.map((waterBase, index) => {
          return (
            <MenuItem
              key={index}
              id={`region-${waterBase.uuid}`}
              value={waterBase.uuid}
            >
              {waterBase.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText className={'error'}>{helperText}</FormHelperText>
    </FormControl>
  );
}

SelectWaterBase.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  formikChange: PropTypes.func.isRequired,
  waterBaseData: PropTypes.array.isRequired,
};

export default SelectWaterBase;
