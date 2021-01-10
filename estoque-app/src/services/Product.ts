import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

type Response = {
  success: boolean,
  data: any,
  msg: string
}

export async function getProducts(): Promise<Response>{
  try{
    const res = await axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/products',
      headers: {
        'x-access-token': token
      }
    })
    return {
      success: true,
      data: res.data,
      msg: ''
    }
  } catch(e) {
    return {
      success: false,
      data: null,
      msg: e.response.data
    }
  }
}

export async function createProduct(data: any): Promise<Response>{
  try{
    console.log(token)
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/products',
      data,
      headers: {
        'x-access-token': token
      }
    })
    return {
      success: true,
      data: res.data,
      msg: ''
    }
  } catch(e) {
    return {
      success: false,
      data: null,
      msg: e.response.data
    }
  }
}

export async function updateProduct(productId: string, data: any): Promise<Response>{
  try{
    const res = await axios({
      method: 'put',
      url: `http://127.0.0.1:8888/product/${productId}`,
      data,
      headers: {
        'x-access-token': token
      }
    })
    return {
      success: true,
      data: res.data,
      msg: ''
    }
  } catch(e) {
    return {
      success: false,
      data: null,
      msg: e.response.data
    }
  }
}

export async function removeProduct(productId: string): Promise<Response>{
  try{
    const res = await axios({
      method: 'delete',
      url: `http://127.0.0.1:8888/product/${productId}`,
      headers: {
        'x-access-token': token
      }
    })
    return {
      success: true,
      data: res.data,
      msg: ''
    }
  } catch(e) {
    return {
      success: false,
      data: null,
      msg: e.response.data
    }
  }
}