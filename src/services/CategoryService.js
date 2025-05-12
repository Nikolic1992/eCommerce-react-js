import axios from "axios";

class CategoryService {
  static getAllCategory = () => axios.get("/categories");
}

export default CategoryService;
