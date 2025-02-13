// Scss
import "./style.scss";

// Material UI
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loader from "@/components/Loader";
import { LoadingButton } from "@mui/lab";
// Redux actions
import { actBookTicket } from "@/store/actions/ticketBooking";
import moment from "moment";

const TicketBookingCard = () => {
  const dispatch = useDispatch();
  const { ticketBookingDetails, selectedSeats, bookTicket } = useSelector(
    (rootReducer) => rootReducer.ticketBooking,
  );

  const event = ticketBookingDetails.data?.eventInfo;
  const loading = ticketBookingDetails.loading;

  const renderSelectedSeats = () =>
    selectedSeats?.map((selectedSeat, idx) => {
      const endLine = idx === selectedSeats.length - 1;
      return (
        <span key={idx}>
          {selectedSeat.code}
          {endLine ? "" : ", "}
        </span>
      );
    });

  const renderPriceTotal = () => {
    const priceTotal = selectedSeats?.reduce(
      (priceTotal, selectedSeat) => priceTotal + selectedSeat.price,
      0,
    );

    return priceTotal.toLocaleString();
  };

  const handleBookTicket = () => {
    const ticket = {
      EventId: event?.eventID,
      SeatedInfos: selectedSeats?.map((seat) => {
        const match = seat.code.match(/^([A-Z]+)(\d+)$/);
        const row = match ? match[1] : "";
        const number = match ? match[2] : "";

        return {
          SeatId: seat.id,
          Price: seat.price,
          EventId: event?.eventID,
          Row: row,
          Number: number,
        };
      }),
    };

    dispatch(actBookTicket(ticket));
  };

  return (
    <Card className="ticket-booking-card" elevation={24} square>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Event image */}
          <CardMedia
            className="ticket-booking-card__media"
            component="img"
            alt="event picture"
            image={event?.imageUrls}
          />
          {/* Card content */}
          <CardContent className="ticket-booking-card__content">
            {/* Event name */}
            <Typography className="ticket-booking-card__event-name" component="h2" variant="h5">
              {event?.eventName}
            </Typography>

            {/* Booking details */}
            <List>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Địa chỉ:</strong> {event?.venueAddress}
                </ListItemText>
              </ListItem>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Ngày chiếu:</strong> {moment(event?.startDate).format("D/MM/YYYY HH:MM")}{" "}
                  | {moment(event?.endDate).format("D/MM/YYYY HH:MM")}
                </ListItemText>
              </ListItem>
            </List>
            <Divider className="ticket-booking-card__divider" />
            {/* Booked Seats */}
            <List>
              <ListItem className="ticket-booking-card__booking-details">
                <ListItemText disableTypography>
                  <strong>Ghế:</strong> {renderSelectedSeats()}
                </ListItemText>
              </ListItem>
            </List>
            <Divider className="ticket-booking-card__divider" />
            {/* Total payment */}
            <Typography className="ticket-booking-card__total" variant="h5" sx={{ mt: "13px" }}>
              <strong>Tổng:</strong>{" "}
              <strong style={{ color: "var(--primary)" }}>{renderPriceTotal()} VNĐ</strong>
            </Typography>
          </CardContent>
          {/* Book ticket */}
          <CardActions sx={{ justifyContent: "center" }}>
            <LoadingButton
              className="ticket-booking-card__btn-booking"
              variant="contained"
              onClick={handleBookTicket}
              loading={bookTicket.loading}
            >
              Đặt Vé
            </LoadingButton>
          </CardActions>{" "}
        </>
      )}
    </Card>
  );
};

export default TicketBookingCard;
