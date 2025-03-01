import axiosConfig from "../store/axiosConfig";

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
//get all hall
export const apiGetAllHall = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/table/hall",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
