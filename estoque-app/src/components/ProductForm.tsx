import { Box, Button, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import ProductFormProps from '../types/ProductFormProps'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {setTmpPicture} from '../services/Product'

export default class ProductForm extends Component<ProductFormProps, {pictureUrl: string}> {

  constructor(props: ProductFormProps){
    super(props)
    this.state = {
      pictureUrl: ''
    }
  }

  handleFormAction(){
    const nameInput = document.getElementById('input-name') as HTMLInputElement
    const currentStockInput = document.getElementById('input-current-stock') as HTMLInputElement
    const minStockInput = document.getElementById('input-min-stock') as HTMLInputElement
    const costInput = document.getElementById('input-cost') as HTMLInputElement
    const priceInput = document.getElementById('input-price') as HTMLInputElement
    const productData = {
      id: this.props.productData?.id as number,
      name: nameInput ? nameInput.value : null,
      currentStock: currentStockInput ? parseInt(currentStockInput.value) : null,
      minStock: minStockInput ? parseInt(minStockInput.value) : null,
      cost: costInput ? parseFloat(costInput.value) : null,
      price: priceInput ? parseFloat(priceInput.value) : null,
      picture: this.state.pictureUrl ? this.state.pictureUrl : null
    }
    // Se estiver atualziando um produto
    if(this.props.productData){
      this.props.update(productData)
    }
    // Se estiver criando um novo produto
    else {
      this.props.create(productData)
    }
  }

  onClose(){
    this.props.close()
  }

  async onPutPicture(){
    const imageInput = document.getElementById('file-input') as HTMLInputElement
    if(imageInput.files?.length){
      const uploadReq = await setTmpPicture(imageInput.files as FileList)
      if(uploadReq.success){
        let pictureUrl = 'http://127.0.0.1:8888/pictures/'
        pictureUrl += uploadReq.data.name + uploadReq.data.extention
        this.setState({
          pictureUrl
        })
      }
      else{
        // TODO: tratamento de erro no upload
      }
    }
  }

  renderPicture(){
    if(this.state.pictureUrl){
      return <img src={this.state.pictureUrl} 
      className="my-product-form-picture" alt="Foto do Produto" />
    } else {
      return null
    }
  }

  getTitle(){
    return this.props.productData ? 'Editar Produto' : 'Cadastrar Produto'
  }

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