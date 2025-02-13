import * as actType from "../constants/baseAuth";

const initialState = {
  role: null,
};

const baseAuth = (state = initialState, { type, payload }) => {
  switch (type) {
    case actType.UPDATE_ROLE_BASE:
      state.role = payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default baseAuth;
