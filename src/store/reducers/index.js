import baseAuthRedecers from "./baseAuth.reducers";
import cinemaSystemReducer from "./cinemaSystem";
import { combineReducers } from "redux";
import eventBannerReducer from "./eventBanner";
import eventDetailsReducer from "./eventDetails";
// Reducers
import eventListReducer from "./eventList";
import eventManagementReducer from "./eventManagement";
import ticketBookingReducer from "./ticketBooking";
import userDetailsReducer from "./userDetails";
import userListReducer from "./userList";
import userManagementReducer from "./userManagement";
import userProfileReducer from "./userProfile";

const rootReducer = combineReducers({
  eventList: eventListReducer,
  eventBanner: eventBannerReducer,
  eventDetails: eventDetailsReducer,
  cinemaSystem: cinemaSystemReducer,
  eventManagement: eventManagementReducer,
  userDetails: userDetailsReducer,
  userManagement: userManagementReducer,
  userList: userListReducer,
  ticketBooking: ticketBookingReducer,
  userProfile: userProfileReducer,
  baseAuth: baseAuthRedecers,
});

export default rootReducer;
