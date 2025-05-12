import axios from "axios";

class CategoryService {
  static getAllCategory = () => axios.get("/categories?offset=0&limit=50");
}

export default CategoryService;
