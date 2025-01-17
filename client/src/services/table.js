import axiosConfig from "../axiosConfig";

//api create table
export const apiCreateTable = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/table",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//get all table
export const apiGetAllTable = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/table",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//delete
export const apiDeleteTable = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/table/${id}`,  
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update 
  export const apiUpdateTable = (id,payload) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "PUT",
          url: `/api/table/${id}`,
          data: payload,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });