import ProductAttributes from "./ProductAttributes";

type ProductItemProps = {
  productData: ProductAttributes,
  delete: Function,
  update: Function,
  increaseStock: Function,
  decreaseStock: Function
}

export default ProductItemProps