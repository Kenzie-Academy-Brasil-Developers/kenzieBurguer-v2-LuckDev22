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

export interface IProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface IHomeContext {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  filterProduct: IProducts[];
  setFilterCard: React.Dispatch<React.SetStateAction<string>>;
  addItenCart: (product: IProducts) => void;
  delItenCart: (itemId: number) => void;
  currentSale: IProducts[];
  fullValue: number;
  delAllCart: () => void;
  filterCard: string;
}
