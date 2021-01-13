import ProductAttributes from './ProductAttributes'

/**
 * Define os atributos das props do component ProductForm
 */
type ProductFormProps = {
  // Dados do produto a ser editado. Se for null, então é para criar um novo produto
  productData?: ProductAttributes,
  // Método chamado para criar o produto
  create: Function,
  // Método chamado para atualizar o produto
  update: Function,
  // Método chamado para fechar o modal
  close: Function
}

export default ProductFormProps