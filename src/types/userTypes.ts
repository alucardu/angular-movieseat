import { IUser } from "src/app/components/authentication/sign-up/sign-up.service"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObjectUser = {
  data: IUser,
  response: IResponse,
}

// MUTATIONS
export type CreateUser = {
  createUser: ReturnObjectUser
}

export type LogoutUser = {
  logoutUser: string
}

export type LoginUser = {
  loginUser: ReturnObjectUser
}

export type AuthenticateByCookie = {
  authenticateByCookie: ReturnObjectUser
}

// QUERIES
export type ConfirmUser = {
  confirmUser: ReturnObjectUser
}
