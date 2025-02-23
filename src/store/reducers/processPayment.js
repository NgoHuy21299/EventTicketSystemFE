import {
  PROCESS_PAYMENT_FAIL,
  PROCESS_PAYMENT_REQUEST,
  PROCESS_PAYMENT_SUCCESS,
} from "../constants/processPayment";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const processPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_PAYMENT_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case PROCESS_PAYMENT_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case PROCESS_PAYMENT_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default processPaymentReducer;
