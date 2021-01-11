import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ProductItemProps from '../types/ProductItemProps';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

  render(){
    return (
      <TableRow>
        <TableCell align="center">
          { this.props.productData.id }
        </TableCell>
        <TableCell align="center">{ this.props.productData.name }</TableCell>
        <TableCell align="center" 
        className={this.getStockClass()}>
          { this.props.productData.currentStock }
          </TableCell>
        <TableCell align="center">{ this.props.productData.minStock }</TableCell>
        <TableCell align="center">{ this.renderPrice(this.props.productData.cost) }</TableCell>
        <TableCell align="center">{ this.renderPrice(this.props.productData.price) }</TableCell>
        <TableCell align="center">
          <IconButton aria-label="delete" onClick={this.onUpdate.bind(this)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="delete" onClick={this.onDelete.bind(this)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}