import axios from "axios";

export const callStaff = (params) => {
  return axios.patch("/api/frontoffice/call-staff", params).then((res) => {
    return {
      status: res.data.status,
      description: res.data.description,
    };
  });
};
