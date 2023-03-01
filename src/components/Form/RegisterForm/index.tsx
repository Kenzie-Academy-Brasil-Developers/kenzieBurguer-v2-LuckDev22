import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserRegisterFormValues } from "../../../providers/@types";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }} = useForm<IUserRegisterFormValues>();
    const { userRegister } = useContext(UserContext) 

    const submit: SubmitHandler<IUserRegisterFormValues>= (formData) => {
      userRegister(formData);
    }

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome"
        type="text"
        error={errors.name}
        register={register("name")}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email}
        register={register("email")}
      />
      <Input
        label="Senha"
        type="password"
        error={errors.password}
        register={register("password")}
      />
      <Input
        label="Confirmar Senha"
        type="password"
        error={errors.password}
        register={register("password")}
      />
      <StyledButton type="submit" $buttonSize="default" $buttonStyle="gray">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
