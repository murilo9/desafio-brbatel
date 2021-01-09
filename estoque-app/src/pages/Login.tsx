import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

type LoginState = {
  session: {
    token: string,
    user: string
  }
}

type LoginResponse = {
  data: {
    auth: boolean,
    token: string,
    user: string,
    msg: string
  }
}

type LoginForm = {
  username: string,
  password: string
}

export default class Login extends Component<{}, LoginState> {

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      session: {
        token: '',
        user: ''
      }
    }
  }

  componentDidMount(){
    const expireDateMilis = Cookies.get('expire')
    // Se houver a data de expiração da sessão slava nos cookies
    if(expireDateMilis){
      const expireDate = new Date(expireDateMilis as string)
      // Se a sessão não tiver expirado
      if(expireDate.getTime() >= new Date().getTime()){
        // Salva os dados da sessão no state
        this.setState({
          session: {
            token: Cookies.get('token') as string,
            user: Cookies.get('user') as string
          }
        })
      }
    }
  }

  getLoginForm(): LoginForm {
    const loginInput = document.getElementById('input-username') as HTMLInputElement;
    const passwordInput = document.getElementById('input-password') as HTMLInputElement;
    return {
      username: loginInput ? loginInput.value : '',
      password: passwordInput ? passwordInput.value : ''
    }
  }

  login(){
    const { username, password } = this.getLoginForm();
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/login',
      data: {
        username,
        password
      }
    })
    .then((res: LoginResponse) => {
      if(res.data.auth){
        const { token, user } = res.data;
        Cookies.set('token', token);
        Cookies.set('user', user);
        let expireDate = new Date();
        expireDate.setUTCHours(expireDate.getHours()+1);
        Cookies.set('expire', expireDate.getTime() as unknown as string);
        this.setState({
          session: {
            token, 
            user
          }
        })
      }
    })
    .catch(e => console.log(e))
  }

  render(){
    if(this.state.session.token)
      return <Redirect to="/dashboard" />
    else 
      return (
        <form>
          token: { this.state.session.token }
          <input type="text" id="input-username" />
          <input type="text" id="input-password" />
          <button type="button" onClick={this.login.bind(this)}>Login</button>
        </form>
      )
  }
}