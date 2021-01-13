// Imports das libs
import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// Import dos components do Material UI
import LoginForm from '../types/LoginForm'
import Button from '@material-ui/core/Button'
import { Box, Card, CardContent, Container, Grid, Snackbar, TextField, Typography } from '@material-ui/core'
// Import dos types
import LoginResponse from '../types/LoginResponse'
import LoginState from '../types/LoginState'

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

  /**
   * Antes do component ser montado, verifica se a sessão está ativa
   */
  componentWillMount(){
    const expireDateMilis = parseInt(Cookies.get('expire') as string)
    // Se houver a data de expiração da sessão salva nos cookies
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

  /**
   * Retorna um objeto contendo o username e password para realizar login.
   */
  getLoginForm(): LoginForm {
    const loginInput = document.getElementById('input-username') as HTMLInputElement
    const passwordInput = document.getElementById('input-password') as HTMLInputElement
    return {
      username: loginInput ? loginInput.value : '',
      password: passwordInput ? passwordInput.value : ''
    }
  }

  /**
   * Faz a requisição para realizar login.
   * @param event 
   */
  login(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    const { username, password } = this.getLoginForm();
    // Faz a requisição na rota de login
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/login',
      data: {
        username,
        password
      }
    })
    .then((res: LoginResponse) => {
      // Se o login foi bem-sucedido
      if(res.data.auth){
        // Coleta o token de acesso e o username
        const { token, user } = res.data
        // Salva os dados no cookie
        Cookies.set('token', token)
        Cookies.set('user', user)
        // Seta a data de expiração (1 hora)
        let expireDate = new Date()
        expireDate.setHours(expireDate.getHours()+1)
        Cookies.set('expire', expireDate.getTime() as unknown as string)
        // Guarda os dados da sessão no state
        this.setState({
          session: {
            token, 
            user
          }
        })
      }
    })
    // Em caso de falha na requisição
    .catch(e => {
      // Exibe a mensagem de alerta
      this.setState({
        snackbar: {
          message: e.response.data,
          show: true
        }
      })
    })
  }

  /**
   * Fecha o snackbar.
   */
  handleClose(){
    this.setState({
      snackbar: {
        message: '',
        show: false
      }
    })
  }

  /**
   * Renderiza a página de login.
   */
  render(){
    if(this.state.session.token)
      return <Redirect to="/dashboard" />
    else 
      return (
        <Container maxWidth="xs" className="my-login-page">
          <Card>
            <CardContent>
              <img src="pallet.png" className="my-logo"/>
              <Box mt={2} mb={3}>
                <Typography component="h1" variant="h4" align="center">
                  Controle de Estoque
                </Typography>
              </Box>
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
              
            </CardContent>
          </Card>
          <Typography component="h3" variant="subtitle1" align="center">
            Flaticon by <a href="https://www.flaticon.com/authors/phatplus" target="_blank">
              phatplus
            </a>
          </Typography>
          <Snackbar open={this.state.snackbar.show} 
          autoHideDuration={6000} 
          onClose={this.handleClose.bind(this)}
          message={this.state.snackbar.message}/>
        </Container>
      )
  }
}