import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "O nome precisa ter pelo menos 3 caracteres!")
      .max(150, "Numero máximo de caracteres atingido!")
      .required("Nome obrigatório!"),
    email: yup.string().email("Email invalido!").required("Email obrigatório!"),
    password: yup
      .string()
      .matches(/(?=.*?[#?!@$%^&*-_])/, "Necessário pelo menos um caracterer especial!")
      .matches(/(?=.*?[A-Z])/, "Necessário uma letra maiúscula!")
      .matches(/(?=.*?[a-z])/, "Necessário uma letra minúscula!")
      .matches(/(?=.*?[0-9])/, "Necessário pelo menos um número!")
      .min(8, "Sua senha deve conter no minimo 8 caracteres")
      .required("Senha obrigatória!"),
    confirmPassword: yup
      .string()
      .required("A confirmação de senha é obrigatório!")
      .oneOf([yup.ref("password")], "A senha não corresponde!"),
  })
  .required();
