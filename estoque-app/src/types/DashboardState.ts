import ProductItem from './ProductItem'

type DashboardState = {
  products: Array<ProductItem>,
  fetching: {
    loadingProducts: boolean
  },
  session: {
    token: string,
    user: string
  }
}

export default DashboardState