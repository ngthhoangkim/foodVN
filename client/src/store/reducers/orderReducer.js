import actionTypes from "../actions/actionTypes";

const initialState = {
  order: null,
  msg: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
        msg: action.msg || "Tạo đơn hàng thành công!",
        isOrder: true,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        msg: action.msg || "Tạo đơn hàng thất bại!",
      };

    case actionTypes.GET_ORDER:
      return {
        ...state,
        order: action.data,
        msg: action.msg || "Lấy thông tin đơn hàng thành công!",
      };
    case actionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
        msg: action.msg || "Cập nhật thông tin sảnh thành công!",
      };
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        ...state,
        order: state.order || null,
        msg: action.msg,
      };

    // case actionTypes.CANCEL_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     order: null,
    //     msg: action.msg || "Hủy đơn hàng thành công!",
    //   };
    // case actionTypes.CANCEL_ORDER_FAIL:
    //   return {
    //     ...state,
    //     msg: action.msg || "Hủy đơn hàng thất bại!",
    //   };
    default:
      return state;
  }
};

export default orderReducer;
