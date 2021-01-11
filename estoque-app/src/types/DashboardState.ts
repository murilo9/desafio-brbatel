import ProductAttributes from './ProductAttributes'

type DashboardState = {
  products: Array<ProductAttributes>,
  productToDelete: number,
  productToUpdate?: ProductAttributes,
  showProductForm: boolean,
  fetching: {
    loadingProducts: boolean,
    deletingProduct: boolean
  },
  dialog: {
    confirmProductExclusion: boolean
  },
  snackbar: {
    show: boolean,
    message: string
  },
  session: {
    token: string,
    user: string
  }
}

export default DashboardState