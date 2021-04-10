export interface TokenPayload {
  name: string;
  sub: string;
  // seront remplis automatiquement par la méthode jwt.sign()
  iat?: string;
  exp?: string;
}
