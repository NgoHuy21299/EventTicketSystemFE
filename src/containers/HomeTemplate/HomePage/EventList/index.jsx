//Others
import "./style.scss";
import React, { useEffect, useState } from "react";

//Material UI
import { Box, Button, Container, Typography } from "@mui/material";
import { SET_MOVIE_TYPE_NOW } from "@/store/constants/eventList";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/Loader";
//Components
import MultipleItems from "@/components/ReactSlick/MultipleItems";
import actGetEventList from "@/store/actions/eventList";
import Modal from "@/components/Modal";

// Redux actions
import { actCloseModal } from "@/store/actions/ticketBooking";

function EventList() {
  const modalProps = useSelector((rootReducer) => rootReducer.ticketBooking.modal);

  useEffect(() => {
    const filterRequest = {
      isUpcoming: true,
    };
    dispatch(actGetEventList(filterRequest));
  }, []);

  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventList.data);
  const loading = useSelector((state) => state.eventList.loading);
  const eventType = useSelector((state) => state.eventList.eventType);

  const handleEventType = () => {
    return eventList;
  };

  return (
    <Box className="home__event-list">
      <Typography align="center" className="home-list__btn-list">
        <Button
          variant="text"
          className={eventType === "now" ? "home-list__btn active" : "home-list__btn"}
          onClick={() => dispatch({ type: SET_MOVIE_TYPE_NOW })}
        >
          Sự kiện
        </Button>
      </Typography>

      <Box className="event-list__carousel-wrapper">
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
          {loading ? (
            <Loader />
          ) : (
            <MultipleItems
              dots={true}
              autoplay={false}
              className="event-list__carousel"
              data={handleEventType()}
              Component="Image"
              slidesToShow={3}
              slidesToScroll={1}
              nextArrow={<FontAwesomeIcon icon={faAngleRight} />}
              prevArrow={<FontAwesomeIcon icon={faAngleLeft} />}
            />
          )}
          <Modal actCloseModal={actCloseModal} modalProps={modalProps} />
        </Container>
      </Box>
    </Box>
  );
}

export default EventList;
