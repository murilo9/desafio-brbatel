import React, { Component } from 'react'
import DashboardState from '../types/DashboardState'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import {getProducts, createProduct} from '../services/Product'
import { AppBar, Button, Container, Toolbar, Typography, Paper } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ProductForm from '../components/ProductForm'
import ProductAttributes from '../types/ProductAttributes'
import ProductItem from '../components/ProductItem'

export default class Dashboard extends Component<{}, DashboardState> {
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      products: [],
      fetching: {
        loadingProducts: true
      },
      session: {
        token: '',
        user: ''
      }
    }
  }

  componentWillMount(){
    const expireDateMilis = parseInt(Cookies.get('expire') as string)
    // Se a sessão tiver expirado, faz logout
    if(expireDateMilis <= new Date().getTime()){
      this.logout()
    } 
    // Se a sessão estiver ativa, guarda os dados dela no state
    else {
      this.setState({
        session: {
          token: Cookies.get('token') as string,
          user: Cookies.get('user') as string
        }
      })
    }
    this.loadProducts()
  }

  async loadProducts(){
    const products = await getProducts()
    if(products.success){
      this.setState({
        products: products.data,
        fetching: {
          loadingProducts: false
        }
      })
    } else {
      //TODO: tratamento de erro ao carregar produtos
    }
  }

  async onCreateProduct(productData: ProductAttributes){
    const createRequest = await createProduct(productData)
    if(createRequest.success){
      const brandNewProduct = createRequest.data
      let products = this.state.products
      products.push(brandNewProduct)
      this.setState({
        products
      })
    }
  }

  async onUpdateProduct(productData: ProductAttributes){

  }

  async onDeleteProduct(productId: number){

  }

  logout(){
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('expire')
    this.setState({
      session: {
        token: '',
        user: ''
      }
    })
  }

  productsTable(){
    if(this.state.fetching.loadingProducts){
      return <Typography variant="subtitle1" gutterBottom>
        Carregando produtos...
      </Typography>
    }
    else if(!this.state.products.length){
      return <Typography variant="subtitle1" gutterBottom>
        Não há produtos registrados.
      </Typography>
    }
    else return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Estoque Atual</TableCell>
              <TableCell align="center">Estoque Mín.</TableCell>
              <TableCell align="center">Custo</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { 
              this.state.products.map(product => 
                <ProductItem productData={{...product}} 
                delete={this.onDeleteProduct.bind(this)} 
                update={this.onUpdateProduct.bind(this)}/>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  render(){
    if(this.state.session.token)
      return (
        <div className="App">
          <AppBar position="static">
            <Toolbar>
            { /* padding */}
              <MenuIcon />
              <Typography variant="h6">
                Controle de Estoque
              </Typography>
              { /* flex-grow: 1 */}
              <Button color="inherit" onClick={this.logout.bind(this)}>Logout</Button>
            </Toolbar>
          </AppBar>
          <main>
            <Container maxWidth="lg">
              <Typography variant="h4">
                Produtos
              </Typography>
              <ProductForm productData={null as unknown as ProductAttributes} 
                create={this.onCreateProduct.bind(this)}
                update={this.onUpdateProduct.bind(this)}
              />
            { this.productsTable() }
            </Container>
          </main>
        </div>
      );
    else
      return <Redirect to="/"/>
  }
}