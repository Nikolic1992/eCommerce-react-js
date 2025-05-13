import axios from "axios";

class CategoryService {
  static getAllCategory = () => axios.get("/categories?limit=20");
}

export default CategoryService;
