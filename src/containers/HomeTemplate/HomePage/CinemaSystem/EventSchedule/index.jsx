import "./style.scss";

// Material UI
import { Grid, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

//Components
import Image from "@/components/Image";
import React from "react";
import moment from "moment";

function EventSchedule({ event, cinemaGroup }) {
  const renderSchedule = () => {
    return event.lstLichChieuTheoPhim?.slice(0, 6).map((schedule, index) => (
      <Grid item key={index} xs={4}>
        <NavLink
          to={`/ticket-booking/${schedule.maLichChieu}`}
          className="event-schedule__schedule-item"
        >
          {moment(schedule.ngayChieuGioChieu).format("D/M/YYYY hh:mm")}
        </NavLink>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={2} className="event-schedule-card">
      <Grid item xs={3} md={2}>
        <Image src={event.hinhAnh} alt={event.tenPhim} />
      </Grid>
      <Grid item xs={9} md={10} className="event-schedule__info">
        <Link to={`/event-detail/${event.maPhim}`}>
          <Typography variant="body1" className="event-schedule__event-name">
            {event.tenPhim}
          </Typography>
        </Link>

        <Typography variant="body2">{cinemaGroup.diaChi}</Typography>

        <Grid container className="event-schedule__schedule-list">
          {renderSchedule()}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EventSchedule;
