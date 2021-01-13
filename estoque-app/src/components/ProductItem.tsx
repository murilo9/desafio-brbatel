/**
 * Item de produto
 * Renderiza uma linha com os dados de um produto na tabela.
 */

 // Import das libs
import React, { Component } from 'react'
// Import dos components do Material UI
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/AddCircleOutline'
import MinusIcon from '@material-ui/icons/RemoveCircleOutline'
// Import dos types
import ProductItemProps from '../types/ProductItemProps'

export default class Dashboard extends Component<ProductItemProps, {}> {

  /**
   * Renderiza o preço no formato monetário com cifrão.
   * @param price Preço
   */
  renderPrice(price: number){
    return `R$ ${price.toFixed(2)}`
  }

  /**
   * Renderiza a foto de um produto, se houver.
   */
  renderPicture(){
    if(this.props.productData.picture){
      return <img src={this.props.productData.picture} 
      className="my-product-picture" alt="Foto do Produto"/>
    }
    else {
      return <span>Sem Foto</span>
    }
  }

  /**
   * Retorna a classe CSS da quantidade em estoque, para indicar se está 
   * abaixo do estoque mínimo.
   */
  getStockClass(): string{
    return this.props.productData.currentStock < this.props.productData.minStock ? 'stock-low' : ''
  }

  /**
   * Método chamado ao clicar no botão de editar produto.
   */
  onUpdate(){
    this.props.update(this.props.productData)
  }

  /**
   * Método chamado ao clicar no botão de excluir produto.
   */
  onDelete(){
    this.props.delete(this.props.productData.id)
  }

  /**
   * Método chamado ao clicar no botão de incrementar estoque do produto.
   */
  onIncreaseStock(){
    this.props.increaseStock(this.props.productData.id)
  }

  /**
   * Método chamado ao clicar no botão de decrementar estoque do produto.
   */
  onDecreaseStock(){
    if(this.props.productData.currentStock >= 1)
      this.props.decreaseStock(this.props.productData.id)
  }

  /**
   * Renderiza o modal de formulário de produto.
   */
  render(){
    return (
      <TableRow>
        <TableCell align="center" className="my-col-id">
          { this.props.productData.id }
        </TableCell>
        <TableCell align="center" className="my-col-picture">
          { this.renderPicture() }
        </TableCell>
        <TableCell align="center" className="my-col-name">
          { this.props.productData.name }
        </TableCell>
        <TableCell align="center" 
        className={this.getStockClass() + ' my-col-current-stock'}>
          <IconButton aria-label="delete" className="my-product-stock-button"
            onClick={this.onDecreaseStock.bind(this)}>
            <MinusIcon />
          </IconButton>
          <span className="my-qty">
            { this.props.productData.currentStock }
          </span>
          <IconButton aria-label="delete" className="my-product-stock-button"
            onClick={this.onIncreaseStock.bind(this)}>
            <PlusIcon />
          </IconButton>
          </TableCell>
        <TableCell align="center" className="my-col-min-stock">
          { this.props.productData.minStock }
        </TableCell>
        <TableCell align="center" className="my-col-cost">
          { this.renderPrice(this.props.productData.cost) }
        </TableCell>
        <TableCell align="center" className="my-col-price">
          { this.renderPrice(this.props.productData.price) }
        </TableCell>
        <TableCell align="center" className="my-col-empty" size="small" padding="none">
          <IconButton aria-label="update"  className="my-product-action-button"
            onClick={this.onUpdate.bind(this)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center" className="my-col-empty" size="small" padding="none">
          <IconButton aria-label="delete"  className="my-product-action-button"
            onClick={this.onDelete.bind(this)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}