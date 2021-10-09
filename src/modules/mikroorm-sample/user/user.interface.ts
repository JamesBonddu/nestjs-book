export interface IUserData {
  bio: string
  email: string
  token: string
  image?: string
  username: string
}

export interface IUserRO {
  user: IUserData
}
