import * as actType from "../constants/eventList";

import { GROUP_ID } from "@/constants";
import { eventApi } from "@/api";

const actGetEventList = (eventFilter) => {
  return (dispatch) => {
    dispatch(actGetEventListRequest());

    const fetchEventList = async () => {
      try {
        const eventList = await eventApi.getEventList(eventFilter);
        dispatch(actGetEventListSuccess(eventList));
      } catch (error) {
        dispatch(actGetEventListFail(error));
      }
    };

    fetchEventList();
  };
};

const actGetEventListRequest = () => {
  return {
    type: actType.GET_MOVIE_LIST_REQUEST,
  };
};

const actGetEventListSuccess = (data) => {
  return {
    type: actType.GET_MOVIE_LIST_SUCCESS,
    payload: data,
  };
};

const actGetEventListFail = (error) => {
  return {
    type: actType.GET_MOVIE_LIST_FAIL,
    payload: error,
  };
};

export default actGetEventList;
