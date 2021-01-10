import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class Dashboard extends Component<{}, {}> {
  render(){
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          Pork
        </TableCell>
        <TableCell align="right">44</TableCell>
        <TableCell align="right">128</TableCell>
        <TableCell align="right">58</TableCell>
        <TableCell align="right">12</TableCell>
      </TableRow>
    )
  }
}