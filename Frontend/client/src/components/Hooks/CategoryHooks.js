import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  let [category, setCategory] = useState([]);

  let getAllCateegories = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );

      setCategory(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCateegories();
  }, []);
  return category;
}
