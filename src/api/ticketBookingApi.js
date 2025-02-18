import axiosClient from "./config/axiosClient";

const resourceName = "event/";

const ticketBookingApi = {
  bookTicket: (ticket) => {
    const url = "user/booking";
    return axiosClient.post(url, ticket);
  },
  getTicketOfficeList: (params) => {
    const url = resourceName + `event-booking/${params}`;
    return axiosClient.get(url);
  },
  createShowtime: (showtime) => {
    const url = resourceName + "TaoLichChieu";
    return axiosClient.post(url, showtime);
  },
  createPayment: (BookingId, Amount, Locale, BankCode, OrderType) => {
    const url = "user/create-payment";
    return axiosClient.post(url, {
      BookingId,
      Amount,
      Locale,
      BankCode,
      OrderType
    });
  },
};

export default ticketBookingApi;
