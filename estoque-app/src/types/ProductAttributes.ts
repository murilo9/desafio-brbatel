/**
 * Define os atributos de um produto
 */
type ProductItem = {
  id?: number,
  name: string,
  currentStock: number,
  minStock: number,
  cost: number,
  price: number,
  picture: string | null  // URL da imagem
}

export default ProductItem