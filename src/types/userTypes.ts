import { IUser } from "src/app/components/authentication/sign-up/sign-up.service"

// TYPES
type ReturnObject = {
  data: IUser,
  message: string
}

// MUTATIONS
export type CreateUser = {
  createUser: ReturnObject
}
