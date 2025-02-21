import {
  GET_MOVIE_DETAILS_FAIL,
  GET_MOVIE_DETAILS_REQUEST,
  GET_MOVIE_DETAILS_SUCCESS,
} from "../constants/eventDetails";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const eventDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAILS_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case GET_MOVIE_DETAILS_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case GET_MOVIE_DETAILS_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default eventDetailsReducer;
