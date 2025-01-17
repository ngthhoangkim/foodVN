import actionTypes from "../actions/actionTypes";

const initialState = {
  tables: [],
  msg: null,
  count: 0,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TABLE_SUCCESS:
      return {
        ...state,
        tables: [...state.tables, action.data],
        msg: "",
      };

    case actionTypes.ADD_TABLE_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.GET_ALL_TABLE:
      return {
        ...state,
        tables: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.DELETE_TABLE_SUCCESS:
      return {
        ...state,
        tables: state.tables.filter((table) => table.id !== action.id),
        msg: action.msg || "Xóa bàn thành công!",
      };
    case actionTypes.DELETE_TABLE_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa bàn thất bại!",
      };

    case actionTypes.UPDATE_TABLE_SUCCESS:
      if (!action.data || !action.data.id) {
        return state;
      }
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.data.id ? { ...table, ...action.data } : table
        ),
        msg: action.msg || "Cập nhật thông tin bàn thành công!",
      };
    case actionTypes.UPDATE_TABLE_FAIL:
      return {
        ...state,
        msg: action.msg,
      };
    default:
      return state;
  }
};

export default tableReducer;
