import {
  GET_MOVIE_MANAGEMENT_FAIL,
  GET_MOVIE_MANAGEMENT_REQUEST,
  GET_MOVIE_MANAGEMENT_SUCCESS,
} from "../constants/eventManagement";

import { eventApi } from "@/api";

const actEventManagementRequest = () => {
  return {
    type: GET_MOVIE_MANAGEMENT_REQUEST,
  };
};

const actEventManagementSuccess = (data) => {
  return {
    type: GET_MOVIE_MANAGEMENT_SUCCESS,
    payload: data,
  };
};

const actEventManagementFail = (error) => {
  return {
    type: GET_MOVIE_MANAGEMENT_FAIL,
    payload: error,
  };
};

const actFetchEventEdit = (event) => {
  return (dispatch) => {
    dispatch(actEventManagementRequest());

    const fetchEventEdit = async () => {
      try {
        const eventEdit = await eventApi.editEvent(event);
        dispatch(actEventManagementSuccess(eventEdit));
      } catch (error) {
        dispatch(actEventManagementFail(error));
      }
    };

    fetchEventEdit();
  };
};

const actFetchEventAdd = (event) => {
  return (dispatch) => {
    dispatch(actEventManagementRequest());

    const fetchEventAdd = async () => {
      try {
        const eventAdd = await eventApi.addEvent(event);
        dispatch(actEventManagementSuccess(eventAdd));
      } catch (error) {
        dispatch(actEventManagementFail(error));
      }
    };

    fetchEventAdd();
  };
};

const actFetchEventDelete = (eventId) => {
  return (dispatch) => {
    dispatch(actEventManagementRequest());

    const fetchEventDelete = async () => {
      try {
        const eventAdd = await eventApi.deleteEvent(eventId);
        dispatch(actEventManagementSuccess(eventAdd));
      } catch (error) {
        dispatch(actEventManagementFail(error));
      }
    };

    fetchEventDelete();
  };
};

export { actFetchEventEdit, actFetchEventAdd, actFetchEventDelete };
