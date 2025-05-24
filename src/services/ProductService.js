import axios from "axios";

class ProductService {
  static getAllProductsService = (limit) =>
    axios.get(`/products?limit=${limit}`);

  static getSingleProduct = (id) => axios.get(`/products/${id}`);

  static getAllProductsByCategory = (category) =>
    axios.get(`/products/category/${category}`);

  static getProductsBySearch = (search) =>
    axios.get(`/products/search?q=${search}`);
}

export default ProductService;
