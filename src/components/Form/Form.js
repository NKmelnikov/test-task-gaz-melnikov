import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SelectRegion from "./SelectRegion";
import regionData from "../../data/regions.json";
import SelectWaterBase from "./SelectWaterBase";
import InputWaterAmount from "./InputWaterAmount";
import InputAddress from "./InputAddress";
import { validationSchema } from "./ValidationSchema";
import { useFormik } from "formik";
import { parse } from "fast-xml-parser";

function Form() {
  const [waterBases, setWaterBases] = useState([]);
  const [regionUuid, setRegionUuid] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `${process.env.REACT_APP_YA_GEO_URL}?apikey=${process.env.REACT_APP_YA_GEO_API_KEY}&geocode=${position.coords.longitude},${position.coords.latitude}`
      )
        .then((response) => response.text())
        .then((textResponse) => {
          const obj = parse(textResponse);
          const locationName = obj.ymaps.GeoObjectCollection.featureMember[1].GeoObject.description.split(
            ","
          )[0];
          setRegionUuid(getRegionUuidByName(locationName));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  function getRegionUuidByName(name) {
    return regionData.data.filter((region) =>
      region.area_names.includes(name)
    )[0].uuid;
  }

  const formik = useFormik({
    initialValues: {
      region: regionUuid,
      waterBase: "",
      waterAmount: "",
      address: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.resetForm({});
      setRegionUuid('')
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="x-form" id={"myForm"}>
      <SelectRegion
        regionData={regionData.data}
        value={formik.values.region}
        error={Boolean(formik.errors.region)}
        helperText={formik.errors.region}
        formikChange={formik.handleChange}
        setWaterBases={setWaterBases}
      />
      <SelectWaterBase
        waterBaseData={waterBases}
        value={formik.values.waterBase}
        error={formik.touched.waterBase && Boolean(formik.errors.waterBase)}
        helperText={formik.touched.waterBase && formik.errors.waterBase}
        formikChange={formik.handleChange}
      />
      <InputWaterAmount
        value={formik.values.waterAmount}
        error={formik.touched.waterAmount && Boolean(formik.errors.waterAmount)}
        helperText={formik.touched.waterAmount && formik.errors.waterAmount}
        formikChange={formik.handleChange}
      />
      <InputAddress
        value={formik.values.address}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        formikChange={formik.handleChange}
      />
      <Button type={"submit"} variant="contained" color="primary">
        Заказать
      </Button>
    </form>
  );
}

export default Form;
