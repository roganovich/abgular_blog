export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface AuthResponse{
  idToken: string,
  expiresIn: string
}
