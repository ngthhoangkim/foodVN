import actionTypes from "../actions/actionTypes";

const initialState = {
  tables: [],
  msg: null,
  count: 0,
  halls: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TABLE:
      return {
        ...state,
        tables: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_ALL_HALL:
      return {
        ...state,
        halls: action.data || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default tableReducer;
