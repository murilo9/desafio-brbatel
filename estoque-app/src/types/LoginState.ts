type LoginState = {
  snackbar: {
    show: boolean,
    message: string
  },
  session: {
    token: string,
    user: string
  }
}

export default LoginState