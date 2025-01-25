import actionTypes from "../actions/actionTypes";

const initialState = {
  orderStaff: [],
  chefStaff: [],
  msg: null,
  allStaff: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER_STAFF_SUCCESS:
      return {
        ...state,
        orderStaff: [...state.orderStaff, action.data],
        msg: "",
      };
    case actionTypes.ADD_ORDER_STAFF_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.ADD_CHEF_STAFF_SUCCESS:
      return {
        ...state,
        chefStaff: [...state.chefStaff, action.data],
        msg: "",
      };
    case actionTypes.ADD_CHEF_STAFF_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.GET_ALL_EMPLOYEE:
      return {
        ...state,
        allStaff: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        allStaff: state.allStaff.filter(
          (employee) => employee.id !== action.id
        ),
        msg: action.msg || "Xóa nhân viên thành công!",
      };
    case actionTypes.DELETE_TABLE_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa nhân viên thất bại!",
      };
    case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
      if (!action.data || !action.data.id) {
        return {
          ...state,
          msg: "Dữ liệu cập nhật không hợp lệ!",
        };
      }
      return {
        ...state,
        allStaff: state.allStaff.map((employee) =>
          employee.id === action.data.id
            ? { ...employee, ...action.data }
            : employee
        ),
        msg: action.msg || "Cập nhật nhân viên thành công!",
      };

    case actionTypes.UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        msg: action.msg || "Cập nhật nhân viên thất bại!",
      };
    default:
      return state;
  }
};

export default employeeReducer;
