import {
  GET_MOVIE_BANNER_FAIL,
  GET_MOVIE_BANNER_REQUEST,
  GET_MOVIE_BANNER_SUCCESS,
} from "../constants/eventBanner";

import { eventApi } from "@/api";

const actFetchBanners = () => {
  return (dispatch) => {
    dispatch(actEventBannerRequest());
    const fetchEventBanners = async () => {
      try {
        const banners = await eventApi.getBannerList();
        dispatch(actEventBannerSuccess(banners));
      } catch (error) {
        dispatch(actEventBannerFail(error));
      }
    };
    fetchEventBanners();
  };
};

const actEventBannerRequest = () => {
  return {
    type: GET_MOVIE_BANNER_REQUEST,
  };
};

const actEventBannerSuccess = (data) => {
  return {
    type: GET_MOVIE_BANNER_SUCCESS,
    payload: data,
  };
};

const actEventBannerFail = (error) => {
  return {
    type: GET_MOVIE_BANNER_FAIL,
    payload: error,
  };
};

export default actFetchBanners;
