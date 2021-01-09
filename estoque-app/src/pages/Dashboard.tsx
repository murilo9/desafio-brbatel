import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';

type DashboardState = {
  session: {
    token: string,
    user: string
  }
}

export default class Dashboard extends Component<{}, DashboardState> {
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      session: {
        token: '',
        user: ''
      }
    }
  }

  componentWillMount(){
    const expireDate = new Date(Cookies.get('expire') as string)
    // Se a sessão tiver expirado, faz logout
    if(expireDate.getTime() <= new Date().getTime()){
      this.logout()
    } 
    // Se a sessão estiver ativa, guarda os dados dela no state
    else {
      this.setState({
        session: {
          token: Cookies.get('token') as string,
          user: Cookies.get('user') as string
        }
      })
    }
  }

  get(){
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/products',
      headers: {
        'x-access-token': this.state.session.token
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch(e => console.log(e))
  }
  
  post(){
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/products',
      headers: {
        'x-access-token': this.state.session.token
      },
      data: {
        name: 'Arduino Uno',
        currentStock: 10,
        minStock: 4,
        cost: 35,
        price: 48
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch(e => console.log(e))
  }
  
  put(){
    axios({
      method: 'put',
      url: 'http://127.0.0.1:8888/product/1',
      headers: {
        'x-access-token': this.state.session.token
      },
      data: {
        name: 'Arduino Uno',
        currentStock: 15,
        minStock: 4,
        cost: 35,
        price: 45
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch(e => console.log(e))
  }
  
  remove(){
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:8888/product/1',
      headers: {
        'x-access-token': this.state.session.token
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch(e => console.log(e))
  }

  logout(){
    Cookies.remove('token');
    Cookies.remove('user');
    this.setState({
      session: {
        token: '',
        user: ''
      }
    })
  }

  render(){
    if(this.state.session.token)
      return (
        <div className="App">
          <button type="button" onClick={this.logout.bind(this)}>logout</button>
          <button type="button" onClick={this.get.bind(this)}>get</button>
          <button type="button" onClick={this.post.bind(this)}>post</button>
          <button type="button" onClick={this.put.bind(this)}>put</button>
          <button type="button" onClick={this.remove.bind(this)}>remove</button>
        </div>
      );
    else
      return <Redirect to="/"/>
  }
}