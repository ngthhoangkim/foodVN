import { apiGetAllTable } from "../../services/table";
import actionTypes from "./actionTypes";

export const getAllTable = () => async (dispatch) => {
  try {
    const response = await apiGetAllTable();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_TABLE,
        data: response.data.data,
        count: response.data.count,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_TABLE,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách bàn",
      });
    }
  } catch (error) {
    console.error("Error fetching tables:", error);
    dispatch({
      type: actionTypes.GET_ALL_TABLE,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách bàn",
    });
  }
};
