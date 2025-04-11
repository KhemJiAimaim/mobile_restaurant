import axios from "axios";

export const getWebInfoData = () => {
    return axios.get("/api/frontoffice/webinfo").then((res) => {
      return{
        status: res.data.status,
        generalWebInfo: res.data.generalWebInfo,
        contactWebInfo: res.data.contactWebInfo,
        taxAndService: res.data.taxAndService,
      }
    });
  };