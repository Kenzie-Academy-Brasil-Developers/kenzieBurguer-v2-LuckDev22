export interface IDefaultProvidersProps {
  children: React.ReactNode;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserRegisterFormValues {
  email: string;
  password: string;
  name: string;
}

export interface IUserLoginFormValues {
  email: string;
  password: string;
}

export interface IUserContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  userRegister: (formData: IUserRegisterFormValues) => Promise<void>;
  userLogin: (formData: IUserLoginFormValues) => Promise<void>;
  userLogout: () => void;
}
