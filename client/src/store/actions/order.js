import { apiCreateOrder, apiCreateOrderDetail, apiGetOrder, apiUpdateOrder } from "../../services/order";
import actionTypes from "./actionTypes";

//create order
export const createOrder = (payload) => async (dispatch) => {
    try {
      const response = await apiCreateOrder(payload);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.CREATE_ORDER_SUCCESS,
          data: response.data.data,
        });
        return Promise.resolve(response.data);
      } else {
        dispatch({
          type: actionTypes.CREATE_ORDER_FAIL,
          data: response.msg,
        });
        return Promise.reject(new Error(response.data.msg));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ORDER_FAIL,
        data: "Có lỗi xảy ra khi tạo order",
      });
      return Promise.reject(new Error("Có lỗi xảy ra khi tạo order"));
    }
  };
//get order
export const getOrder = (id) => async (dispatch) => {
  try {
    const response = await apiGetOrder(id);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ORDER,
        data: response.data.data,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ORDER,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách order",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ORDER,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách order",
    });
  }
};
//update order
export const updateOrder = (customerID) => async (dispatch) => {
  try {
    const response = await apiUpdateOrder(customerID);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_ORDER_SUCCESS,
        data: response.data.data,
        msg: response.data.msg || "Cập nhật đơn hàng thành công!",
      });
      dispatch(getOrder(customerID));
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.UPDATE_ORDER_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ORDER_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });

    return Promise.reject(
      new Error("Cập nhật thất bại, vui lòng thử lại sau!")
    );
  }
};

// //create order detail
// export const createOrderDetail = (payload) => async (dispatch) => {
//   try {
//     const response = await apiCreateOrderDetail(payload);
//     if (response.data.err === 0) {
//       dispatch({
//         type: actionTypes.CREATE_ORDERDETAIL_SUCCESS,
//         data: response.data.data,
//       });
//       return Promise.resolve(response.data);
//     } else {
//       dispatch({
//         type: actionTypes.CREATE_ORDERDETAIL_FAIL,
//         data: response.msg,
//       });
//       return Promise.reject(new Error(response.data.msg));
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.CREATE_ORDER_FAIL,
//       data: "Có lỗi xảy ra khi thêm món vào order",
//     });
//     return Promise.reject(new Error("Có lỗi xảy ra khi thêm món vào order"));
//   }
// };