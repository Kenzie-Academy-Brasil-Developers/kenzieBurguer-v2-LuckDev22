import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  label: string;
  type: 'password' | 'text' | 'email';
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
}

const Input = ({ label, type, error, register }: IInputProps) => {
  return (
    <fieldset>
      <StyledTextField
        label={label}
        type={type}
        {...register}
      />
      {error ? <StyledParagraph fontColor='red'>{error.message}</StyledParagraph> : null}
    </fieldset>
  );
};

export default Input;
