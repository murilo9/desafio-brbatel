import React, { Component } from 'react'
import DashboardState from '../types/DashboardState'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import {getProducts, createProduct, removeProduct, updateProduct} from '../services/Product'
import { AppBar, Button, Container, Toolbar, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Box, IconButton, CardContent, Card } from '@material-ui/core'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import AddIcon from '@material-ui/icons/Add'
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
      products: [], // Lista de produtos
      productToDelete: -1,  // ID do produto a ser deletado
      productToUpdate: undefined,  // Dados do produto a ser atualizado
      showProductForm: false,
      fetching: {   // Indicadores de fetching server
        loadingProducts: true,
        deletingProduct: false
      },
      dialog: {   // Modais
        confirmProductExclusion: false
      },
      snackbar: {
        show: false,
        message: ''
      },
      session: {  // Dados da sessão
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
  }

  async componentDidMount(){
    const productsReq = await getProducts()
    if(productsReq.success){
      console.log(productsReq.data)
      this.setState({
        products: productsReq.data,
        fetching: {
          loadingProducts: false,
          deletingProduct: false
        }
      })
    } else {
      this.setState({
        snackbar: {
          message: 'Houve um erro ao carregar os produtos.',
          show: true
        }
      })
    }
  }

  async onCreateProduct(productData: ProductAttributes){
    const createRequest = await createProduct(productData)
    if(createRequest.success){
      const brandNewProduct = createRequest.data
      let products = this.state.products
      products.push(brandNewProduct)
      this.setState({
        products,
        showProductForm: false,
        snackbar: {
          show: true,
          message: 'Produto cadastrado com sucesso.'
        }
      })
    }
  }

  async doUpdateProduct(productData: ProductAttributes){
    // Fecha o form de produto
    this.setState({
      showProductForm: false,
    })
    // Pega o state.producToUpdate.id, pois o atributo id não existe no parâmetro productData
    const productId = productData.id as number
    // Faz o fetch no server
    const updateReq = await updateProduct(productId, productData)
    // Caso o produto tenha sido atualizado com sucesso
    if(updateReq.success){
      // Atualiza a lista de produtos
      let products = this.state.products
      let updatedProductId = productData?.id as number
      let productIndex = products.findIndex(product => product.id === updatedProductId)
      if(productIndex >= 0){
        products.splice(productIndex, 1, updateReq.data)
      }
      this.setState({
        products,
        snackbar: {
          show: true,
          message: 'Produto atualizado com sucesso.'
        }
      })
    }
    // Caso haja falha na atualização
    else {
      this.setState({
        snackbar: {
          show: true,
          message: updateReq.msg
        }
      })
    }
  }

  /**
   * @desc Deleta o produto com o ID especificado em state.productToDelete
   */
  async doDeleteProduct(){
    // Marca o início do fetch
    this.setState({
      fetching: {
        deletingProduct: true,
        loadingProducts: false
      }
    })
    // Faz o fetch no server
    const deleteReq = await removeProduct(this.state.productToDelete)
    // Caso o fetch tenha sido bem-sucedido
    if(deleteReq.success){
      let products = this.state.products
      let deletedProductId = this.state.productToDelete
      let productIndex = products.findIndex(product => product.id === deletedProductId)
      if(productIndex >= 0){
        products.splice(productIndex, 1)
      }
      this.setState({
        products,
        snackbar: {
          show: true,
          message: 'Produto excluído com sucesso.'
        }
      })
    }
    // Caso o fetch não tenha sido bem-sucedido
    else{
      this.setState({
        snackbar: {
          show: true,
          message: deleteReq.msg
        }
      })
    }
    // Marca o fim do fetch
    this.setState({
      dialog: {
        confirmProductExclusion: false
      },
      fetching: {
        loadingProducts: false,
        deletingProduct: false
      }
    })
  }

  /**
   * @desc Chamado após fechar o modal de confirmação de exclusão de produto.
   */
  confirmProductExclusionOnClose(){
    this.setState({
      dialog: {
        confirmProductExclusion: false
      }
    })
  }

  async increaseStock(productId: number){
    let productData = this.state.products.find(product => product.id === productId)
    if(productData){
      productData.currentStock += 1
      productData.id = productId
      this.doUpdateProduct(productData)
    }
    else {
      this.setState({
        snackbar: {
          message: 'Houve um erro ao tentar atualizar o produto.',
          show: true
        }
      })
    }
  }

  async decreaseStock(productId: number){
    let productData = this.state.products.find(product => product.id === productId)
    if(productData){
      productData.currentStock -= 1
      productData.id = productId
      this.doUpdateProduct(productData)
    }
    else {
      this.setState({
        snackbar: {
          message: 'Houve um erro ao tentar atualizar o produto.',
          show: true
        }
      })
    }
  }

  openDeleteDialog(productToDelete: number){
    this.setState({
      productToDelete,
      dialog: {
        confirmProductExclusion: true
      }
    })
  }

  openUpdateProductForm(productToUpdate: ProductAttributes){
    this.setState({
      productToUpdate,
      showProductForm: true
    })
  }

  hideSnackbar(){
    this.setState({
      snackbar: {
        show: false,
        message: ''
      }
    })
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

  getProductsTotal(){
    return this.state.products.length
  }

  getBruteProfit(){
    let bruteIncome = 0
    let bruteCost = 0
    this.state.products.forEach(product => {
      bruteIncome += (product.price * product.currentStock)
      bruteCost += (product.cost * product.currentStock)
    })
    return (bruteIncome - bruteCost).toFixed(2)
  }

  renderProductsTable(){
    if(this.state.fetching.loadingProducts){
      return <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Carregando produtos...
        </Typography>
      </Box>
    }
    else if(!this.state.products.length){
      return <Box mt={2}>
        <Paper className="my-padded-paper">
          <Typography variant="subtitle1" gutterBottom>
            Não há produtos registrados.
          </Typography>
        </Paper>
      </Box>
    }
    else return (
      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="my-col-id">ID</TableCell>
                <TableCell align="center" className="my-col-picture">Foto</TableCell>
                <TableCell align="center" className="my-col-id-name">Nome</TableCell>
                <TableCell align="center" className="my-col-current-stock">Estoque Atual</TableCell>
                <TableCell align="center" className="my-col-min-stock">Estoque Mín.</TableCell>
                <TableCell align="center" className="my-col-cost">Custo</TableCell>
                <TableCell align="center" className="my-col-price">Preço</TableCell>
                <TableCell align="center" className="my-col-empty" padding="none"></TableCell>
                <TableCell align="center" className="my-col-empty" padding="none"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { 
                this.state.products.map(product => 
                  <ProductItem productData={{...product}} 
                  key={product.id}
                  delete={this.openDeleteDialog.bind(this)} 
                  update={this.openUpdateProductForm.bind(this)}
                  increaseStock={this.increaseStock.bind(this)}
                  decreaseStock={this.decreaseStock.bind(this)}/>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  toggleProductForm(){
    this.setState({
      showProductForm: !this.state.showProductForm,
      productToUpdate: undefined
    })
  }

  renderProductForm(){
    if(this.state.showProductForm)
      return (
        <ProductForm 
          productData={this.state.productToUpdate} 
          create={this.onCreateProduct.bind(this)}
          update={this.doUpdateProduct.bind(this)}
          close={this.toggleProductForm.bind(this)}
        />
      )
    else return (
      <Button color="primary" variant="contained" 
      onClick={this.toggleProductForm.bind(this)}>
        <AddIcon /> Adicionar
      </Button>
    )
  }

  render(){
    if(this.state.session.token)
      return (
        <div className="App">

          {/* Barra do topo */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Controle de Estoque
              </Typography>
                <Box display={{xs: 'none', sm: 'block'}}>
                  <Button color="inherit" 
                    onClick={this.logout.bind(this)}>
                      Logout
                  </Button>
                </Box>
                <Box display={{xs: 'block', sm: 'none'}}>
                  <IconButton>
                    <LogoutIcon />
                  </IconButton>
                </Box>
            </Toolbar>
          </AppBar>

          {/* Interface do Dashboard */}
          <main>
            <Container maxWidth="lg">
              <Box mt={3} mb={2}>
                <Typography variant="h4">
                  Produtos
                </Typography>
              </Box>
            { this.renderProductForm() }
            { this.renderProductsTable() }
            <Box mt={2}>
              <Paper className="my-padded-paper">
                <Box mb={2}>
                  <Typography variant="subtitle1">
                    Estatísticas
                  </Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Total de produtos: <strong>{ this.getProductsTotal() }</strong>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Lucro bruto: R$ <strong>{ this.getBruteProfit() }</strong>
                </Typography>
              </Paper>
            </Box>
            </Container>
          </main>

          {/* Dialog de confirmação de exclusão de produto */}
          <Dialog
            open={this.state.dialog.confirmProductExclusion}
            onClose={this.confirmProductExclusionOnClose.bind(this)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deseja mesmo excluir este produto?
              </DialogContentText>
              <DialogActions>
              <Button onClick={this.confirmProductExclusionOnClose.bind(this)} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.doDeleteProduct.bind(this)} color="primary" autoFocus>
                {this.state.fetching.deletingProduct ? 'Excluindo...' : 'Excluir'}
              </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          
          {/* Snackbar de feedback */}
          <Snackbar open={this.state.snackbar.show} 
          autoHideDuration={6000} 
          onClose={this.hideSnackbar.bind(this)}
          message={this.state.snackbar.message}/>
        </div>
      );
    else
      return <Redirect to="/"/>
  }
}