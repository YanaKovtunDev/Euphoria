export interface IAuthEmail {
  email: string;
}

export interface IAuth extends IAuthEmail {
  password: string;
}

export interface IAuthReset extends IAuth {
  code: string;
}
