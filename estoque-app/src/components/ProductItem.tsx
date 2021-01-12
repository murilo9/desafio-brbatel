import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ProductItemProps from '../types/ProductItemProps';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusIcon from '@material-ui/icons/AddCircleOutline'
import MinusIcon from '@material-ui/icons/RemoveCircleOutline'

export default class Dashboard extends Component<ProductItemProps, {}> {

  renderPrice(price: number){
    return `R$ ${price.toFixed(2)}`
  }

  getStockClass(): string{
    return this.props.productData.currentStock < this.props.productData.minStock ? 'stock-low' : ''
  }

  onUpdate(){
    this.props.update(this.props.productData)
  }

  onDelete(){
    this.props.delete(this.props.productData.id)
  }

  onIncreaseStock(){
    this.props.increaseStock(this.props.productData.id)
  }

  onDecreaseStock(){
    if(this.props.productData.currentStock >= 1)
      this.props.decreaseStock(this.props.productData.id)
  }

  render(){
    return (
      <TableRow>
        <TableCell align="center" className="my-col-id">
          { this.props.productData.id }
        </TableCell>
        <TableCell align="center" className="my-col-name">
          { this.props.productData.name }
        </TableCell>
        <TableCell align="center" 
        className={this.getStockClass() + ' my-col-current-stock'}>
          <IconButton aria-label="delete" onClick={this.onDecreaseStock.bind(this)}>
            <MinusIcon />
          </IconButton>
          <span className="my-qty">
            { this.props.productData.currentStock }
          </span>
          <IconButton aria-label="delete" onClick={this.onIncreaseStock.bind(this)}>
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
          <IconButton aria-label="delete" onClick={this.onUpdate.bind(this)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center" className="my-col-empty" size="small" padding="none">
          <IconButton aria-label="delete" onClick={this.onDelete.bind(this)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}