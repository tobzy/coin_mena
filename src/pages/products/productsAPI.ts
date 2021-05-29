import axios from "axios";

// An async request for products data
export function fetchProducts(amount = 1) {
  return axios.get('/productData.json');
}
