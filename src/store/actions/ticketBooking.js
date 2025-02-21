import * as actType from "../constants/ticketBooking";
import { ticketBookingApi } from "@/api";
import {
  PROCESS_PAYMENT_FAIL,
  PROCESS_PAYMENT_REQUEST,
  PROCESS_PAYMENT_SUCCESS,
} from "../constants/processPayment";

/*
 * Fetch ticket booking details
 */
const actGetTicketBookingDetails = (eventId) => {
  return (dispatch) => {
    dispatch(actTicketBookingDetailsRequest());

    (async () => {
      try {
        const ticketBookingDetails = await ticketBookingApi.getTicketOfficeList(eventId);
        dispatch(actTicketBookingDetailsSuccess(ticketBookingDetails));
      } catch (error) {
        dispatch(actTicketBookingDetailsFail(error));
      }
    })();
  };
};

const actTicketBookingDetailsRequest = () => ({
  type: actType.GET_TICKET_BOOKING_DETAILS_REQUEST,
});

const actTicketBookingDetailsFail = (error) => ({
  type: actType.GET_TICKET_BOOKING_DETAILS_FAIL,
  payload: error,
});

const actTicketBookingDetailsSuccess = (data) => ({
  type: actType.GET_TICKET_BOOKING_DETAILS_SUCCESS,
  payload: data,
});

/*
 * Book ticket
 */
const actBookTicket = (ticket) => {
  return (dispatch) => {
    dispatch(actBookTicketRequest());

    (async () => {
      try {
        const bookingResponse = await ticketBookingApi.bookTicket(ticket);

        if (bookingResponse.success) {
          const BookingId = bookingResponse.bookingId;
          const Amount = bookingResponse.totalAmount;
          const Locale = "vn";
          const OrderType = "other";
          const BankCode = "";
          const paymentResponse = await ticketBookingApi.createPayment(
            BookingId,
            Amount,
            Locale,
            BankCode,
            OrderType,
          );
          window.location.href = paymentResponse.paymentUrl;
        } else {
          dispatch(actBookTicketFail("Đặt vé thất bại!"));
        }
      } catch (error) {
        dispatch(actBookTicketFail(error));
      }
    })();
  };
};

/*
 * payment return
 */
const actPaymentReturn = () => {
  return (dispatch) => {
    dispatch(actProcessPaymentRequest());
    (async () => {
      try {
        const payReturnResponse = await ticketBookingApi.paymentReturn();  
        await ticketBookingApi.processPayment(payReturnResponse); 
        dispatch(actProcessPaymentSuccess(payReturnResponse));
      } catch (error) {
        dispatch(actProcessPaymentFail(error));
      }
    })();
  };
};

const actBookTicketRequest = () => ({
  type: actType.BOOK_TICKET_REQUEST,
});

const actBookTicketFail = (error) => ({
  type: actType.BOOK_TICKET_FAIL,
  payload: error,
});

const actBookTicketSuccess = () => ({
  type: actType.BOOK_TICKET_SUCCESS,
});

/*
 * Payment ticket
 */
const actPaymentTicketFail = (error) => ({
  type: actType.PAYMENT_TICKET_FAILED,
  payload: error,
});

const actPaymentTicketSuccess = (data) => ({
  type: actType.PAYMENT_TICKET_SUCCESS,
  payload: data,
});

/*
 * Choose seats
 */
const actChooseSeat = (seat) => ({
  type: actType.CHOOSE_SEAT,
  payload: seat,
});

/*
 * Close modal
 */
const actCloseModal = () => ({
  type: actType.CLOSE_MODAL,
});

//process payment
const actProcessPaymentRequest = () => {
  return {
    type: PROCESS_PAYMENT_REQUEST,
  };
};

const actProcessPaymentSuccess = (data) => {
  return {
    type: PROCESS_PAYMENT_SUCCESS,
    payload: data,
  };
};

const actProcessPaymentFail = (error) => {
  return {
    type: PROCESS_PAYMENT_FAIL,
    payload: error,
  };
};
//

export {
  actGetTicketBookingDetails,
  actBookTicket,
  actChooseSeat,
  actCloseModal,
  actBookTicketSuccess,
  actBookTicketFail,
  actPaymentTicketSuccess,
  actPaymentTicketFail,
  actPaymentReturn,
  actProcessPaymentFail,
  actProcessPaymentSuccess,
  actProcessPaymentRequest,
};
