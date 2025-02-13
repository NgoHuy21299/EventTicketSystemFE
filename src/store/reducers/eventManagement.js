import {
  GET_MOVIE_MANAGEMENT_FAIL,
  GET_MOVIE_MANAGEMENT_REQUEST,
  GET_MOVIE_MANAGEMENT_SUCCESS,
} from "../constants/eventManagement";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const eventManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_MANAGEMENT_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case GET_MOVIE_MANAGEMENT_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case GET_MOVIE_MANAGEMENT_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default eventManagementReducer;
