import axios from "axios";

export const getAddOrderFood = (params) => {
  return axios.post("/api/frontoffice/orderfood", params).then((res) => {
    return {
      status: res.data.status,
      description: res.data.description,
    };
  });
};

export const getStatusFoodOrders = () => {
  return axios.get("/api/frontoffice/status-food-orders").then((res) => {
    return {
      status: res.data.status,
      orderAll: res.data.orderAll,
      taxAndService: res.data.taxAndService,
    };
  });
};
