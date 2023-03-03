import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserLoginFormValues } from '../../../providers/@types';
import { UserContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { loginSchema } from './loginSchema';
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const { userLogin } = useContext(UserContext);

  const submit: SubmitHandler<IUserLoginFormValues> = (formData) => {
    userLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Email'
        type='email'
        error={errors.email}
        register={register('email')}
      />
      <Input
        label='Senha'
        type='password'
        error={errors.password}
        register={register('password')}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
