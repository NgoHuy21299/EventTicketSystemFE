import * as actType from "../constants/eventList";

const initialState = {
  loading: false,
  error: null,
  data: null,
  eventType: "now",
};

const eventListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actType.GET_MOVIE_LIST_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actType.GET_MOVIE_LIST_SUCCESS:
      state.loading = false;
      state.data = payload;
      state.error = null;
      return { ...state };

    case actType.GET_MOVIE_LIST_FAIL:
      state.loading = false;
      state.data = null;
      state.error = payload;
      return { ...state };

    case actType.SET_MOVIE_TYPE_NOW:
      state.eventType = "now";
      return { ...state };

    case actType.SET_MOVIE_TYPE_SOON:
      state.eventType = "soon";
      return { ...state };

    default:
      return { ...state };
  }
};

export default eventListReducer;
