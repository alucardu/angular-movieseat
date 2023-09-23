import { IUser } from "src/app/components/authentication/sign-up/sign-up.service"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObject = {
  data: IUser,
  response: IResponse,
}

// MUTATIONS
export type CreateUser = {
  createUser: ReturnObject
}

export type LoginUser = {
  loginUser: ReturnObject
}

export type AuthenticateByCookie = {
  authenticateByCookie: ReturnObject
}

// QUERIES
export type ConfirmUser = {
  confirmUser: ReturnObject
}
