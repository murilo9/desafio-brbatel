import React, { Component } from 'react'
import DashboardState from '../types/DashboardState'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import {getProducts} from '../services/Product'
import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import ProductsTable from '../components/ProductsTable'

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

  renderTable(){
    
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
              <Button color="primary" variant="contained">
                <AddIcon /> Adicionar
              </Button>
              <ProductsTable {...this.state} />
            </Container>
          </main>
        </div>
      );
    else
      return <Redirect to="/"/>
  }
}