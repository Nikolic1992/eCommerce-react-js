import axios from "axios";

class ProductService {
  static getAllProductsService = () => axios.get("/products?offset=0&limit=30");
}

export default ProductService;
