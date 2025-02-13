import {
  GET_MOVIE_DETAILS_FAIL,
  GET_MOVIE_DETAILS_REQUEST,
  GET_MOVIE_DETAILS_SUCCESS,
} from "../constants/eventDetails";

import { eventApi } from "@/api";

const actFetchEventDetails = (eventId) => {
  return (dispatch) => {
    dispatch(actEventDetailsRequest());

    const fetchEventDetails = async () => {
      try {
        const eventDetails = await eventApi.getEventDetails(eventId);
        dispatch(actEventDetailsSuccess(eventDetails));
      } catch (error) {
        dispatch(actEventDetailsFail(error));
      }
    };

    fetchEventDetails();
  };
};

const actEventDetailsRequest = () => {
  return {
    type: GET_MOVIE_DETAILS_REQUEST,
  };
};

const actEventDetailsSuccess = (data) => {
  return {
    type: GET_MOVIE_DETAILS_SUCCESS,
    payload: data,
  };
};

const actEventDetailsFail = (error) => {
  return {
    type: GET_MOVIE_DETAILS_FAIL,
    payload: error,
  };
};

export default actFetchEventDetails;
