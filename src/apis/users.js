import axios from 'axios'

export default axios.create({
  baseURL: 'https://users-api-node.herokuapp.com/',
})
