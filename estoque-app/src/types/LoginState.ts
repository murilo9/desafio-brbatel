/**
 * Define todos os dados que pertencem ao state da página de Login
 */
type LoginState = {
  // Exibe um snackbar com mensagens de feedback
  snackbar: {
    show: boolean,
    message: string
  },
  // Guarda os dados da sessão
  session: {
    token: string,
    user: string
  }
}

export default LoginState