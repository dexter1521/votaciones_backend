export interface JwtPayload {
  sub: number;
  rol: string;
  nombre?: string;
  iat?: number;
  exp?: number;
}
