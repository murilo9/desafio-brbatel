type LoginResponse = {
  data: {
    auth: boolean,
    token: string,
    user: string,
    msg: string
  }
}

export default LoginResponse