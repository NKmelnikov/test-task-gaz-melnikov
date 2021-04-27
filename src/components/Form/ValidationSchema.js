import "core-js/es/promise";
import "core-js/es/set";
import "core-js/es/map";
import * as yup from "yup";

export const validationSchema =  yup.object().shape({
  region: yup.string().required("Обязательное поле"),
  waterBase: yup.string().required("Обязательное поле"),
  waterAmount: yup
    .number()
    .typeError("Значение должно быть числом")
    .positive()
    .required("Обязательное поле"),
  address: yup.string().max(255).required("Обязательное поле"),
});
