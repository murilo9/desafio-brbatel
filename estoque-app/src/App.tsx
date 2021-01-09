import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

type AppState = {
  view: string,
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
 
/* Os parâmetros do Component permitem passar props (não há, por isso é um objeto vazio) 
    e state (o type AppSate).*/
export class App extends Component<{}, AppState> {

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      view: 'login',
      session: {
        token: '',
        user: ''
      }
    }
  }

  componentDidMount(){
    const expireDate = new Date(Cookies.get('expire') as string)
    if(expireDate.getTime() <= new Date().getTime()){
      this.logout()
    } else {
      this.setState({
        view: 'dashboard',
        session: {
          token: Cookies.get('token') as string,
          user: Cookies.get('user') as string
        }
      })
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
      console.log(res.data)
      if(res.data.auth){
        const { token, user } = res.data;
        Cookies.set('token', token);
        Cookies.set('user', user);
        let expireDate = new Date();
        expireDate.setUTCHours(expireDate.getHours()+1);
        Cookies.set('expire', expireDate.getTime() as unknown as string);
        this.setState({
          view: 'dashboard',
          session: {
            token, 
            user
          }
        })
      }
    })
    .catch(e => console.log(e))
  }

  logout(){
    // Apaga os cookies
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('expire');
    // Renderiza a tela de login
    this.setState({
      view: 'login',
      session: {
        token: '',
        user: ''
      }
    })
  }
  
  renderDashboard(){
    return (
      <div className="App">
        <button type="button" onClick={this.logout.bind(this)}>logout</button>
        <button type="button" onClick={this.get.bind(this)}>get</button>
        <button type="button" onClick={this.post.bind(this)}>post</button>
        <button type="button" onClick={this.put.bind(this)}>put</button>
        <button type="button" onClick={this.remove.bind(this)}>remove</button>
      </div>
    );
  }
  
  renderLoginForm(){
    return <form>
      <input type="text" id="input-username" />
      <input type="text" id="input-password" />
      <button type="button" onClick={this.login.bind(this)}>Login</button>
    </form>
  }

  render(){
    if(this.state.view === 'login'){
      return this.renderLoginForm();
    } else if(this.state.view === 'dashboard'){
      return this.renderDashboard();
    } else {
      return 'No view'
    }
  }
}

export default App;