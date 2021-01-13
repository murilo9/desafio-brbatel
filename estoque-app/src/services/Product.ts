/**
 * Este service contém todos os métodos utilizados para interagir com o servidor
 * no que diz respeito a produtos (ler, atualizar, editar, excluir).
 */

import axios from 'axios'
import Cookies from 'js-cookie'
import ProductServiceResponse from '../types/ProductServiceResponse'
import ProductAttributes from '../types/ProductAttributes'

/**
 * Retorna a lista de todos os produtos cadastrados.
 * @return {Array<ProductAttributes>}
 */
export async function getProducts(): Promise<ProductServiceResponse>{
  const token = Cookies.get('token')
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

/**
 * Cadastra um produto.
 * @param productData Produto com os dados definidos
 */
export async function createProduct(productData: ProductAttributes): 
  Promise<ProductServiceResponse>{
  const token = Cookies.get('token')
  try{
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/products',
      data: productData,
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

/**
 * Atualiza os dados de um produto.
 * @param productData Produto com os dados autalizados
 * @return {ProductAttributes} Produto com os dados atualizados
 */
export async function updateProduct(productData: ProductAttributes): 
  Promise<ProductServiceResponse>{
  const token = Cookies.get('token')
  try{
    const res = await axios({
      method: 'put',
      url: `http://127.0.0.1:8888/product/${productData.id}`,
      data: productData,
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

/**
 * Exclui um produto.
 * @param productId ID do produto a ser excluído
 */
export async function removeProduct(productId: number): Promise<ProductServiceResponse>{
  const token = Cookies.get('token')
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

/**
 * Faz upload de uma imagem.
 * @param files Lista de arquivos do file input.
 * @return {String} URL da imagem
 */
export async function uploadPicture(files: FileList){
  const token = Cookies.get('token')
  let formData = new FormData()
  formData.append("file", files[0])
  try{
    const res = await axios({
      method: 'post',
      url: `http://127.0.0.1:8888/picture`,
      data: formData,
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