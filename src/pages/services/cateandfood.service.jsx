import axios from "axios";

export const getCategoriesAndFoods = () => {
  return axios.get('/catefoods').then((res) => {
    return { status: res.data.status, categories: res.data.catefoods, foods: res.data.foods}
  })
}