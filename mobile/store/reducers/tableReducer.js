import actionTypes from "../actions/actionTypes";

const initialState = {
  tables: [],
  msg: null,
  count: 0,
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
    default:
      return state;
  }
};

export default tableReducer;
