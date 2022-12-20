import * as yup from "yup";

import {
  EMAIL_REQUIRED,
  EMAIL_NOT_VALID,
  PASSWORD_REQUIRED,
  PASSWORD_NOT_VALID,
} from "../../utils/constants";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
  password: yup.string().required(PASSWORD_REQUIRED).min(3, PASSWORD_NOT_VALID),
});
