import React, { Component } from 'react'
import DashboardState from '../types/DashboardState'
import ProductItem from './ProductItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Paper, Typography } from '@material-ui/core'

export default class ProductsTable extends Component<DashboardState, {}>{
  render(){
    if(this.props.fetching.loadingProducts){
      return <Typography variant="subtitle1" gutterBottom>
        Carregando produtos...
      </Typography>
    }
    else if(!this.props.products.length){
      return <Typography variant="subtitle1" gutterBottom>
        Não há produtos registrados.
      </Typography>
    }
    else return (
      <TableContainer component={Paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Produtos
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Estoque Atual</TableCell>
              <TableCell align="center">Estoque Mín.</TableCell>
              <TableCell align="center">Custo</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.props.products.map(product => <ProductItem {...product} />)}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}