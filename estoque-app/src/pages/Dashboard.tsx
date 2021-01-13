/**
 * Página de Dashboard
 * Contém a topbar com botão de logout, a tabela de produtos, o botão de
 * adicionar produtos e o display de estatísticas.
 */

// Import das libs
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// Import dos services
import {getProducts, createProduct, removeProduct, updateProduct} from '../services/Product'
// Import dos componentes do Material UI
import { AppBar, Button, Container, Toolbar, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Box, IconButton, CardContent, Card } from '@material-ui/core'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import AddIcon from '@material-ui/icons/Add'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
// Import dos types
import ProductForm from '../components/ProductForm'
import ProductAttributes from '../types/ProductAttributes'
import ProductItem from '../components/ProductItem'
import DashboardState from '../types/DashboardState'

export default class Dashboard extends Component<{}, DashboardState> {
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      // Lista de produtos
      products: [], 
      // ID do produto a ser deletado
      productToDelete: -1,  
      // Dados do produto a ser atualizado
      productToUpdate: undefined,  
      // Exibe o modal com formulário de produto
      showProductForm: false,
      // Indicadores de fetching server
      fetching: {   
        loadingProducts: true,
        deletingProduct: false
      },
      // Modais
      dialog: {   
        confirmProductExclusion: false
      },
      // Snackbar de feedback
      snackbar: {
        show: false,
        message: ''
      },
      // Dados da sessão
      session: {  
        token: '',
        user: ''
      }
    }
  }

  /**
   * Antes do component ser montado, verifica se a sessão está ativa
   */
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

  /**
   * Assim que o component for montado, carrega a lista de produtos cadastrados
   */
  async componentDidMount(){
    // Faz a requisição através do service
    const productsReq = await getProducts()
    //Caso a requisição tenha sido bem-sucedida
    if(productsReq.success){
      this.setState({
        // Seta a lista de produtos
        products: productsReq.data,
        // Indica que o fetch terminou e permite que os produtos sejam exibidos
        fetching: {
          loadingProducts: false,
          deletingProduct: false
        }
      })
    } 
    // Em casao de falha na requisição
    else {
      this.setState({
        // Exibe mensagem de feedback
        snackbar: {
          message: productsReq.msg,
          show: true
        }
      })
    }
  }

  /**
   * Método executado ao submeter o form para cadastrar um produto.
   * @param productData Dados do produto a ser cadsatrado
   */
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

  /**
   * Método executado ao submeter o form para atualizar um produto.
   * @param productData Dados do produto a ser atualizado
   */
  async onUpdateProduct(productData: ProductAttributes){
    // Fecha o form de produto
    this.setState({
      showProductForm: false,
    })
    // Faz o fetch no server
    const updateReq = await updateProduct(productData)
    // Caso o produto tenha sido atualizado com sucesso
    if(updateReq.success){
      // Atualiza a lista de produtos
      let products = this.state.products
      let updatedProductId = productData?.id as number
      let productIndex = products.findIndex(product => product.id === updatedProductId)
      if(productIndex >= 0){
        products.splice(productIndex, 1, updateReq.data)
      }
      // Exibe mensagem de feedback
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
      // Exibe mensagem de erro
      this.setState({
        snackbar: {
          show: true,
          message: updateReq.msg
        }
      })
    }
  }

  /**
   * Deleta o produto com o ID especificado em state.productToDelete.
   */
  async onDeleteProduct(){
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
      // Atualiza a lista de produtos
      let products = this.state.products
      let deletedProductId = this.state.productToDelete
      let productIndex = products.findIndex(product => product.id === deletedProductId)
      if(productIndex >= 0){
        products.splice(productIndex, 1)
      }
      // Exibe mensagem de feedback
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
        // Exibe mensagem de erro
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
   * Fecha o modal de confirmação de exclusão de produto.
   */
  confirmProductExclusionOnClose(){
    this.setState({
      dialog: {
        confirmProductExclusion: false
      }
    })
  }

  /**
   * Incrementa o estoque de um produto.
   * @param productId ID do produto
   */
  async increaseStock(productId: number){
    // Produra o produo
    let productData = this.state.products.find(product => product.id === productId)
    // Se o produto for encontrado
    if(productData){
      // Incrementa o estoque
      productData.currentStock += 1
      productData.id = productId
      // Chama o service para atualizar o produto
      this.onUpdateProduct(productData)
    }
    // Caso o produto não exista
    else {
      this.setState({
        snackbar: {
          message: 'Houve um erro ao tentar atualizar o produto.',
          show: true
        }
      })
    }
  }

  /**
   * Decrementa o estoque de um produto.
   * @param productId ID do produto
   */
  async decreaseStock(productId: number){
    // Procura o produto
    let productData = this.state.products.find(product => product.id === productId)
    // Se o produto for encontrado
    if(productData){
      // Decrementa o estoque
      productData.currentStock -= 1
      productData.id = productId
      // Chama o service para atualizar o produto
      this.onUpdateProduct(productData)
    }
    // Caso o produto não exista
    else {
      this.setState({
        snackbar: {
          message: 'Houve um erro ao tentar atualizar o produto.',
          show: true
        }
      })
    }
  }

  /**
   * Abre o modal de confirmação de exclusão do produto.
   * @param productToDelete ID do produto
   */
  openDeleteDialog(productToDelete: number){
    this.setState({
      productToDelete,
      dialog: {
        confirmProductExclusion: true
      }
    })
  }

  /**
   * Abre o modal com o formulário de atualizar produto.
   * @param productToUpdate Dados do produto a ser atualizado
   */
  openUpdateProductForm(productToUpdate: ProductAttributes){
    this.setState({
      productToUpdate,
      showProductForm: true
    })
  }

  /**
   * Oculta a snackbar.
   */
  hideSnackbar(){
    this.setState({
      snackbar: {
        show: false,
        message: ''
      }
    })
  }

  /**
   * Realiza logout.
   */
  logout(){
    // Limpa os cookies
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('expire')
    // Remove os dados da sessão no state
    this.setState({
      session: {
        token: '',
        user: ''
      }
    })
  }

  /**
   * Retorna o total de produtos.
   */
  getProductsTotal(){
    return this.state.products.length
  }

  /**
   * Retorna o lucro bruto (total de preços - total de custos).
   */
  getBruteProfit(){
    let bruteIncome = 0
    let bruteCost = 0
    this.state.products.forEach(product => {
      bruteIncome += (product.price * product.currentStock)
      bruteCost += (product.cost * product.currentStock)
    })
    return (bruteIncome - bruteCost).toFixed(2)
  }

  /**
   * Component funcional que renderiza a tabela de produtos.
   */
  renderProductsTable(){
    // Caso esteja carregando os produtos
    if(this.state.fetching.loadingProducts){
      return <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Carregando produtos...
        </Typography>
      </Box>
    }
    // Caso não hajam produtos cadastrados
    else if(!this.state.products.length){
      return <Box mt={2}>
        <Paper className="my-padded-paper">
          <Typography variant="subtitle1" gutterBottom>
            Não há produtos registrados.
          </Typography>
        </Paper>
      </Box>
    }
    // Caso hajam produtos cadastrados
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

  /**
   * Ativa/desativa o modal de formulário de produto.
   */
  toggleProductForm(){
    this.setState({
      showProductForm: !this.state.showProductForm,
      productToUpdate: undefined
    })
  }

  /**
   * Component funcional que renderiza o modal do formulário de produto.
   */
  renderProductForm(){
    if(this.state.showProductForm)
      return (
        <ProductForm 
          productData={this.state.productToUpdate} 
          create={this.onCreateProduct.bind(this)}
          update={this.onUpdateProduct.bind(this)}
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

  /**
   * Renderiza a página de Dashboard.
   */
  render(){
    // Se a sessão esitver ativa, renderiza a página
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
                  <IconButton onClick={this.logout.bind(this)}>
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
              <Button onClick={this.onDeleteProduct.bind(this)} color="primary" autoFocus>
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
    // Se a sessão tiver expirado, redireciona pra página inicial (de login)
    else
      return <Redirect to="/"/>
  }
}