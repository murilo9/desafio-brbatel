import ProductAttributes from "./ProductAttributes";

/**
 * Define os atributos das props do component ProductItem
 */
type ProductItemProps = {
  // Dados do produto a ser exibido
  productData: ProductAttributes,
  // Método chamado para excluir o produto
  delete: Function,
  // Método chamado para atualizar o produto
  update: Function,
  // Método chamado para incrementar o estoque do produto
  increaseStock: Function,
  // Método chamado para decrementar o estoque do produto
  decreaseStock: Function
}

export default ProductItemProps