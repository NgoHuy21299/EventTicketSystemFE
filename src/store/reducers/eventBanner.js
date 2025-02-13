import {
  GET_MOVIE_BANNER_FAIL,
  GET_MOVIE_BANNER_REQUEST,
  GET_MOVIE_BANNER_SUCCESS,
} from "../constants/eventBanner";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const eventBannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_BANNER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case GET_MOVIE_BANNER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case GET_MOVIE_BANNER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default eventBannerReducer;
