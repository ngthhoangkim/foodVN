import axiosConfig from "../axiosConfig";

//api create
export const apiCreateFood = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/food",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//get all 
export const apiGetAllFood = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/food",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//delete
export const apiDeleteFood = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/food/${id}`,  
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update 
  export const apiUpdateFood = (id,payload) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "PUT",
          url: `/api/food/${id}`,
          data: payload,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });