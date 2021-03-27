export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserTokenPayload {
  name: string;
  sub: string;
  // seront remplis automatiquement par la méthode jwt.sign()
  iat?: string;
  exp?: string;
}
