/**
 * Component de formulário de produto
 * Exibe um modal que contém um formulário utilizado para
 * criar ou atualizar um produto.
 */

// Import das libs
import React, { Component } from 'react'
// Import dos types
import ProductFormProps from '../types/ProductFormProps'
// Import dos services
import {uploadPicture} from '../services/Product'
// Import dos components do Material UI
import { Box, Button, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class ProductForm extends Component<ProductFormProps, {pictureUrl: string}> {

  constructor(props: ProductFormProps){
    super(props)
    this.state = {
      // URL da foto do produto
      pictureUrl: ''
    }
  }

  /**
   * Método executado ao submeter o formulário para criar ou atualizar o produto.
   */
  handleFormAction(){
    // Referencia os inputs de texto
    const nameInput = document.getElementById('input-name') as HTMLInputElement
    const currentStockInput = document.getElementById('input-current-stock') as HTMLInputElement
    const minStockInput = document.getElementById('input-min-stock') as HTMLInputElement
    const costInput = document.getElementById('input-cost') as HTMLInputElement
    const priceInput = document.getElementById('input-price') as HTMLInputElement
    // Constrói o objeto contendo os dados do produto
    const productData = {
      id: this.props.productData?.id as number,
      name: nameInput ? nameInput.value : null,
      currentStock: currentStockInput ? parseInt(currentStockInput.value) : null,
      minStock: minStockInput ? parseInt(minStockInput.value) : null,
      cost: costInput ? parseFloat(costInput.value) : null,
      price: priceInput ? parseFloat(priceInput.value) : null,
      picture: this.state.pictureUrl ? this.state.pictureUrl : null
    }
    // Se estiver atualizando um produto
    if(this.props.productData){
      this.props.update(productData)
    }
    // Se estiver cadastrando um novo produto
    else {
      this.props.create(productData)
    }
  }

  /**
   * Fecha este modal
   */
  onClose(){
    this.props.close()
  }

  /**
   * Método executado quando uma imagem for inserida no file input.
   */
  async onPutPicture(){
    // Referencia o file input
    const imageInput = document.getElementById('file-input') as HTMLInputElement
    // Se houver um arquivo no file input
    if(imageInput.files?.length){
      // Chama o serviço para fazer upload da imagem
      const uploadReq = await uploadPicture(imageInput.files as FileList)
      // Caso o upload tenha sido bem-sucedido
      if(uploadReq.success){
        // Monta a URL da imagem
        let pictureUrl = 'http://127.0.0.1:8888/pictures/'
        pictureUrl += uploadReq.data.name + uploadReq.data.extention
        // Insere a URL nos atributos do produto
        this.setState({
          pictureUrl
        })
      }
      else{
        // TODO: tratamento de erro no upload
      }
    }
  }

  /**
   * Renderiza a foto do produto, se houver.
   */
  renderPicture(){
    if(this.state.pictureUrl){
      return <img src={this.state.pictureUrl} 
      className="my-product-form-picture" alt="Foto do Produto" />
    } else {
      return null
    }
  }

  /**
   * Retorna o título do modal.
   */
  getTitle(){
    return this.props.productData ? 'Editar Produto' : 'Cadastrar Produto'
  }

  /**
   * Retorna o valor inicial de um campo do formulário.
   * @param field Nome do campo
   */
  initialValue(field: string){
    if(this.props.productData){
      switch(field){
        case 'name':
          return this.props.productData.name
        case 'currentStock':
          return this.props.productData.currentStock
        case 'minStock':
          return this.props.productData.minStock
        case 'price':
          return this.props.productData.price
        case 'cost':
          return this.props.productData.cost
        default:
          return ''
      }
    }
    else return ''
  }

  /**
   * Renderiza o modal de formulário de produto.
   */
  render(){
    return (
      <Dialog open={true} 
      onClose={this.onClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          { this.getTitle() }
        </DialogTitle>
        <DialogContent>
          <TextField id="input-name" label="Nome" fullWidth 
          defaultValue={this.initialValue('name')}/>
          <TextField id="input-current-stock" label="Estoque atual" fullWidth 
          defaultValue={this.initialValue('currentStock')}/>
          <TextField id="input-min-stock" label="Estoque mín." fullWidth
          defaultValue={this.initialValue('minStock')}/>
          <TextField id="input-cost" label="Custo" fullWidth
          defaultValue={this.initialValue('cost')}/>
          <TextField id="input-price" label="Preço" fullWidth
          defaultValue={this.initialValue('price')}/>
          <Box mt={2}>
          { this.renderPicture.bind(this) }
          </Box>
          <Box mt={2}>
            <Button variant="contained" component="label">
              Foto
              <input type="file" hidden id="file-input" 
              onChange={this.onPutPicture.bind(this)}/>
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose.bind(this)} color="default">
            Cancelar
          </Button>
          <Button onClick={this.handleFormAction.bind(this)} color="primary">
            { this.props.productData ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}