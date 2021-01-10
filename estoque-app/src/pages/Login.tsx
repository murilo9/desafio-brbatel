import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import LoginResponse from '../types/LoginResponse'
import LoginState from '../types/LoginState'
import LoginForm from '../types/LoginForm'
import Button from '@material-ui/core/Button';
import { Container, Grid, Snackbar, TextField, Typography } from '@material-ui/core';

export default class Login extends Component<{}, LoginState> {

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      snackbar: {
        message: '',
        show: false
      },
      session: {
        token: '',
        user: ''
      }
    }
  }

  componentWillMount(){
    const expireDateMilis = parseInt(Cookies.get('expire') as string)
    // Se houver a data de expiração da sessão slava nos cookies
    if(expireDateMilis){
      // Se a sessão não tiver expirado
      if(expireDateMilis >= new Date().getTime()){
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
    console.log(loginInput)
    return {
      username: loginInput ? loginInput.value : '',
      password: passwordInput ? passwordInput.value : ''
    }
  }

  login(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
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
        expireDate.setHours(expireDate.getHours()+1);
        Cookies.set('expire', expireDate.getTime() as unknown as string);
        this.setState({
          session: {
            token, 
            user
          }
        })
      }
    })
    .catch(e => {
      this.setState({
        snackbar: {
          message: e.response.data,
          show: true
        }
      })
    })
  }

  handleClose(){
    this.setState({
      snackbar: {
        message: '',
        show: false
      }
    })
  }

  render(){
    if(this.state.session.token)
      return <Redirect to="/dashboard" />
    else 
      return (
        <Container maxWidth="xs">
          <Typography component="h1" variant="h4">Controle de Estoque</Typography>
          <form noValidate onSubmit={this.login.bind(this)}>
            <Grid container>
              <Grid item xs={12}>
                <TextField id="input-username" 
                label="Login" 
                fullWidth
                variant="outlined" 
                margin="normal"/>
              </Grid>
              <Grid item xs={12}>
                <TextField id="input-password" 
                label="Senha" 
                fullWidth
                variant="outlined" 
                type="password" 
                margin="normal"/>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </form>
          <Snackbar open={this.state.snackbar.show} 
          autoHideDuration={6000} 
          onClose={this.handleClose.bind(this)}
          message={this.state.snackbar.message}/>
        </Container>
      )
  }
}