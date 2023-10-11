import { IUser } from "src/app/components/authentication/sign-up/sign-up.service"

export interface IResponse {
  type: string,
  code: string
}

// TYPES
type ReturnObjectFriendAndUserObject = {
  friend: IUser,
  user: IUser
}

type ReturnObjectFriendAndUser = {
  data: ReturnObjectFriendAndUserObject,
  response: IResponse,
}

type ReturnObjectUser = {
  data: IUser,
  response: IResponse,
}

type ReturnObjectUsers = {
  data: [IUser],
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

export type AddFriend = {
  addFriend: ReturnObjectFriendAndUser
}

export type RemoveFriend = {
  removeFriend: ReturnObjectFriendAndUser
}


export type AuthenticateByCookie = {
  authenticateByCookie: ReturnObjectUser
}

export type GetUsers = {
  getUsers: ReturnObjectUsers
}

export type GetAllUsers = {
  getAllUsers: ReturnObjectUsers
}


// QUERIES
export type ConfirmUser = {
  confirmUser: ReturnObjectUser
}
