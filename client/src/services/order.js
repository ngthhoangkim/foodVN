import axiosConfig from "../axiosConfig";

export const apiCreateOrder = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/order",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
//api get
export const apiGetOrder = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/order/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update order
export const apiUpdateOrder = (customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/api/order/update",
        data: {customerID}
      });
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });