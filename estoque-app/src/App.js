import axios from 'axios'

function get(){
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8888/products'
  })
  .then((res) => {
    console.log(res)
  })
  .catch(e => console.log(e))
}

function post(){
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8888/products',
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

function put(){
  axios({
    method: 'put',
    url: 'http://127.0.0.1:8888/product/1',
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

function remove(){
  axios({
    method: 'delete',
    url: 'http://127.0.0.1:8888/product/1'
  })
  .then((res) => {
    console.log(res)
  })
  .catch(e => console.log(e))
}

function App() {
  return (
    <div className="App">
      <button type="button" onClick={get}>get</button>
      <button type="button" onClick={post}>post</button>
      <button type="button" onClick={put}>put</button>
      <button type="button" onClick={remove}>remove</button>
    </div>
  );
}

export default App;
