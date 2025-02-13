//Others
import "./style.scss";

//Material UI
import { Box, Button, Container, Typography } from "@mui/material";
import { SET_MOVIE_TYPE_NOW, SET_MOVIE_TYPE_SOON } from "@/store/constants/eventList";
import { faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
//Components
import MultipleItems from "@/components/ReactSlick/MultipleItems";
import actGetEventList from "@/store/actions/eventList";
import { useEffect } from "react";

function EventList() {
  useEffect(() => {
    dispatch(actGetEventList());
  }, []);

  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventList.data);
  const loading = useSelector((state) => state.eventList.loading);
  const eventType = useSelector((state) => state.eventList.eventType);

  let eventTypeList;

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
        {/* <Button
          variant="text"
          className={eventType === "soon" ? "home-list__btn active" : "home-list__btn"}
          onClick={() => dispatch({ type: SET_MOVIE_TYPE_SOON })}
        >
          Phim sắp chiếu
        </Button> */}
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

          {/* <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Link to="/">
              <Button
                variant="contained"
                size="small"
                className="btn-wrapper btn-filled event-list__carousel-btn"
              >
                Show all
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className="event-list__carousel-btn-icon"
                />
              </Button>
            </Link>
          </Container> */}
        </Container>
      </Box>
    </Box>
  );
}

export default EventList;
