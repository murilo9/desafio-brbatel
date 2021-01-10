import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ProductItem from '../types/ProductItem';

export default class Dashboard extends Component<ProductItem, {}> {
  render(){
    return (
      <TableRow>
        <TableCell align="center">
          { this.props.id }
        </TableCell>
        <TableCell align="center">{ this.props.name }</TableCell>
        <TableCell align="center">{ this.props.currentStock }</TableCell>
        <TableCell align="center">{ this.props.minStock }</TableCell>
        <TableCell align="center">{ this.props.cost }</TableCell>
        <TableCell align="center">{ this.props.price }</TableCell>
        <TableCell align="center">Editar</TableCell>
        <TableCell align="center">Excluir</TableCell>
      </TableRow>
    )
  }
}