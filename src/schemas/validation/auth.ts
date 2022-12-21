import * as yup from "yup";

import {
  NAME_REQUIRED,
  EMAIL_REQUIRED,
  EMAIL_NOT_VALID,
  PASSWORD_REQUIRED,
  PASSWORD_NOT_VALID,
  PASSWORDS_NOT_MATCH,
  COMFIRM_PASSWORD_REQUIRED,
} from "../../utils/constants";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
  password: yup.string().required(PASSWORD_REQUIRED).min(3, PASSWORD_NOT_VALID),
});

export const registerValidationSchema = yup.object().shape({
  name: yup.string().required(NAME_REQUIRED),
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_REQUIRED),
  password: yup
    .string()
    .required(PASSWORD_REQUIRED)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required(COMFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref("password")], PASSWORDS_NOT_MATCH),
});
