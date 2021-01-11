import ProductAttributes from './ProductAttributes'

type ProductFormProps = {
  productData?: ProductAttributes,
  create: Function,
  update: Function,
  close: Function
}

export default ProductFormProps