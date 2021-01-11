import ProductAttributes from './ProductAttributes'

type DashboardState = {
  products: Array<ProductAttributes>,
  fetching: {
    loadingProducts: boolean
  },
  session: {
    token: string,
    user: string
  }
}

export default DashboardState