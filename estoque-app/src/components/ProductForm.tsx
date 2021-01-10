import { Button, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import ProductFormState from '../types/ProductFormState'
import ProductFormProps from '../types/ProductFormProps'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ProductForm extends Component<ProductFormProps, ProductFormState> {
  constructor(props: ProductFormProps){
    super(props)
    this.state = {
      // Se houver um objeto em productData, deve obrigatoriamente exibir o form
      showForm: props.productData ? true : false,
      // Só entra no editMode se houver um objeto em props.productData
      editMode: props.productData ? true : false
    }
  }

  toggleForm(){
    this.setState({
      showForm: !this.state.showForm
    })
  }

  handleFormAction(){
    const nameInput = document.getElementById('input-name') as HTMLInputElement
    const currentStockInput = document.getElementById('input-current-stock') as HTMLInputElement
    const minStockInput = document.getElementById('input-min-stock') as HTMLInputElement
    const costInput = document.getElementById('input-cost') as HTMLInputElement
    const priceInput = document.getElementById('input-price') as HTMLInputElement
    const productData = {
      name: nameInput ? nameInput.value : null,
      currentStock: currentStockInput ? currentStockInput.value : null,
      minStock: minStockInput ? minStockInput.value : null,
      cost: costInput ? costInput.value : null,
      price: priceInput ? priceInput.value : null
    }
    // Se estiver atualziando um produto
    if(this.props.productData){
      this.props.update(productData)
    }
    // Se estiver criando um novo produto
    else {
      this.props.create(productData)
    }
    this.setState({
      showForm: false
    })
  }

  render(){
    if(this.state.showForm)
      return (
        <Dialog open={this.state.showForm} 
        onClose={this.toggleForm.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <TextField id="input-name" label="Nome" fullWidth/>
              <TextField id="input-current-stock" label="Estoque atual" fullWidth/>
              <TextField id="input-min-stock" label="Estoque mín." fullWidth/>
              <TextField id="input-cost" label="Custo" fullWidth/>
              <TextField id="input-price" label="Preço" fullWidth/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleForm.bind(this)} color="default">
              Cancelar
            </Button>
            <Button onClick={this.handleFormAction.bind(this)} color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
      )
    else
      return (
        <Button color="primary" variant="contained" 
          onClick={this.toggleForm.bind(this)}>
          <AddIcon /> Adicionar
        </Button>
      )
  }
}