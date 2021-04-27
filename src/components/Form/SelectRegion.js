import React, { useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import waterBaseData from "../../data/waterbases.json";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";
import InputLabel
  from '@material-ui/core/InputLabel';

function SelectRegion({
  value,
  error,
  formikChange,
  helperText,
  regionData,
  setWaterBases,
}) {
  useEffect(() => {
    setWaterBases(
      waterBaseData.data.filter((waterBase) => waterBase.region_uuid === value)
    );
  }, [setWaterBases, value]);

  return (
    <FormControl className="x-form__fc region">
      <InputLabel id="regionSelectLabel">Выберите регион</InputLabel>
      <Select
        id="regionSelect"
        labelId="regionSelectLabel"
        name={"region"}
        value={value}
        error={error}
        onChange={formikChange}
      >
        {regionData.map((region, index) => {
          return (
            <MenuItem
              key={index}
              id={`region-${region.uuid}`}
              value={region.uuid}
            >
              {region.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText className={"error"}>{helperText}</FormHelperText>
    </FormControl>
  );
}

SelectRegion.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  formikChange: PropTypes.func.isRequired,
  regionData: PropTypes.array.isRequired,
  setWaterBases: PropTypes.func.isRequired,
};

export default SelectRegion;
