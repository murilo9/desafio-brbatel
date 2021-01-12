import { Button, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import ProductFormProps from '../types/ProductFormProps'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ProductForm extends Component<ProductFormProps, {}> {

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
      price: priceInput ? parseFloat(priceInput.value) : null
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
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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