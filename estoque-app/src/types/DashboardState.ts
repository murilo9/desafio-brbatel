import ProductAttributes from './ProductAttributes'

/**
 * Define todos os dados que pertencem ao state da página de Dashboard
 */
type DashboardState = {
  // Lista de produtos cadastrados
  products: Array<ProductAttributes>,
  // ID do produto a ser excluído
  productToDelete: number,
  // Dados do produto a ser atualizado
  productToUpdate?: ProductAttributes,
  // Exibe o modal de formulário de produto
  showProductForm: boolean,
  // Informa se a aplicação está fazendo fetch no servidor
  fetching: {
    loadingProducts: boolean,
    deletingProduct: boolean
  },
  // Exibe o dialog de confirmação de exclusão de produto
  dialog: {
    confirmProductExclusion: boolean
  },
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

export default DashboardState