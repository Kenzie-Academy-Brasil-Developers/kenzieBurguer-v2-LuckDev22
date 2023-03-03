import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().email("Email invalido!").required("Email obrigatório!"),
    password: yup.string().required("Senha obrigatória!"),
  })
  .required();
