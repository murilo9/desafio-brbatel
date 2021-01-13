/**
 * Define os atributos do objeto de resposta da request de login
 */
type LoginResponse = {
  data: {
    auth: boolean,  // Se a autenticação foi bem-sucedida ou não
    token: string,  // Token de acesso da sessão
    user: string,   // Login do usuário
    msg: string     // Mensagem de feedback (em caso de falha na autenticação)
  }
}

export default LoginResponse