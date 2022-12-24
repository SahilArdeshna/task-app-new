import * as yup from "yup";
import {
  NAME_REQUIRED,
  EMAIL_REQUIRED,
  EMAIL_NOT_VALID,
} from "../../utils/constants";

export const userValidation = yup.object().shape({
  name: yup.string().required(NAME_REQUIRED),
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
});
