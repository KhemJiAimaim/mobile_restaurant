import axios from "axios";

export const getAddOrderFood = (params) => {
  return axios.post('/api/frontoffice/orderfood', params).then((res) => {
    return {
      status: res.data.status,
      description: res.data.description
    }
  })
}