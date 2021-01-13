/**
 * Define os atributos de uma resposta dos serviços de produtos.
 */
type Response = {
  // Se a requisição foi bem-sucedida ou não
  success: boolean,
  // Resposta da requisição
  data: any,
  // Mensagem de feedback (em caso de falha na requisição)
  msg: string
}

export default Response