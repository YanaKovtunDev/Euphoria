export interface IUserInfo {
  firstName?: string;
  lastName?: string;
  country?: string;
  companyName?: string;
  streetAddress?: string;
  apt?: string;
  city?: string;
  state?: string;
  phone?: string;
  postalCode?: number;
  deliveryInstruction?: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

export interface IUser extends IUserInfo {
  email: string;
  password: string;
}

export interface IUserTokenData {
  id: string;
}

export interface IReqUser {
  user: IUserTokenData;
}
