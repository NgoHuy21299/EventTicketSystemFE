import "./style.scss";

//Material UI
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { faAnglesRight, faAt, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Components
import Image from "@/components/Image";
import Loader from "@/components/Loader";
import actFetchEventDetails from "@/store/actions/eventDetails";
import moment from "moment";
import { useEffect } from "react";

function EventDetailsPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.eventDetails.data);
  const loading = useSelector((state) => state.eventDetails.loading);

  const eventID = useParams();

  useEffect(() => {
    dispatch(actFetchEventDetails(eventID.id));
  }, []);

  const socialList = [
    {
      name: "Share",
      icon: (
        <FontAwesomeIcon
          className="event-detail__desc-btn event-detail__desc-btn-icon"
          icon={faFacebookF}
        />
      ),
      className: "desc-btn--facebook",
    },
    {
      name: "Tweet",
      icon: (
        <FontAwesomeIcon
          className="event-detail__desc-btn event-detail__desc-btn-icon"
          icon={faTwitter}
        />
      ),
      className: "desc-btn--twitter",
    },
    {
      name: "WhatsApp",
      icon: (
        <FontAwesomeIcon
          className="event-detail__desc-btn event-detail__desc-btn-icon"
          icon={faWhatsapp}
        />
      ),
      className: "desc-btn--whatsapp",
    },
    {
      name: "E-mail",
      icon: (
        <FontAwesomeIcon
          className="event-detail__desc-btn event-detail__desc-btn-icon"
          icon={faAt}
        />
      ),
      className: "desc-btn--email",
    },
  ];

  const renderSocialBtn = () => {
    return socialList.map((item, index) => (
      <Button
        key={index}
        variant="contained"
        size="small"
        className={`btn-wrapper event-detail__desc-btn ${item.className}`}
        startIcon={item.icon}
      >
        <Typography sx={{ display: { xs: "none", lg: "block", xl: "block" } }}>
          {item.name}
        </Typography>
      </Button>
    ));
  };
  const renderLoader = () => {
    if (loading) return <Loader />;
  };

  return (
    <>
      {renderLoader()}
      {data && (
        <Box id="event-detail-page">
          <Box>
            <Box
              className="event-detail__top-info"
              sx={{ height: { xs: "210px", sm: "420px", md: "630px" } }}
            >
              {/* Background */}
              <Box className="event-detail__top-background">
                <Image src={data.imageUrls} />
              </Box>

              <Container className="event-detail__top-info-wrapper container">
                <Box className="top-info__img">
                  <Image src={data.imageUrls} alt={data.name} />
                </Box>

                {/* Top info for PC screen */}
                <Box className="top-info__content hide-on-mobile-tablet">
                  <Typography variant="h3" className="top-info__content-title" sx={{ mb: 2 }}>
                    {data.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="large"
                    className="btn-wrapper btn-outline top-info__btn"
                    startIcon={<FontAwesomeIcon icon={faPlay} />}
                    href={data.trailer}
                  >
                    Play Trailer
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    className="btn-wrapper btn-filled top-info__btn"
                    endIcon={<FontAwesomeIcon icon={faAnglesRight} />}
                  >
                    <Link to={`/event-booking/${data.id}`}>Tickets</Link>
                  </Button>
                </Box>

                {/* Top info for tablet + mobile screens */}
                <Button
                  variant="contained"
                  size="large"
                  className="btn-wrapper btn-filled top-info__btn hide-on-pc"
                  endIcon={<FontAwesomeIcon icon={faAnglesRight} />}
                >
                  <Link to={`/event-booking/${data.id}`}>Tickets</Link>
                </Button>
              </Container>
            </Box>

            {/* Top info for pc */}
            <Box className="event-detail__top-desc hide-on-mobile-tablet">
              <Box className="event-detail__desc-left">
                <p>
                  <FontAwesomeIcon className="event-detail__desc-icon" icon={faHeart} />
                  Rating: {data.danhGia}
                </p>
                <p>{data.hot && "Hot"}</p>
              </Box>
              <Box className="event-detail__desc-right">{renderSocialBtn()}</Box>
            </Box>
          </Box>

          <Container maxWidth="md" className="event-detail__content-wrapper container">
            <Typography
              className="top-info__content-title"
              sx={{ display: { xs: "block", sm: "none" } }}
              mb={2}
              variant="h3"
            >
              {data.name}
            </Typography>
            <Grid container spacing={2} className="event-detail__content">
              <Grid item xs={12} md={7} className="event-detail__syno">
                <h4 className="event-detail__content-title">Mô tả</h4>
                <p>{data.description}</p>
              </Grid>
              <Grid item xs={12} md={5} className="event-detail__details">
                <h4 className="event-detail__content-title">Chi tiết</h4>
                <p>Thời gian công chiếu: {moment(data.startDate).format("D/M/YYYY hh:mm")}</p>
                <p>Thời gian kết thúc: {moment(data.endDate).format("D/M/YYYY hh:mm")}</p>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="event-detail__content">
              <Grid item xs={12} md={7} className="event-detail__syno">
                <h4 className="event-detail__content-title">Địa chỉ</h4>
                <p>{data.venueAddress + ", " + data.venueName}</p>
              </Grid>
              <Grid item xs={12} md={5} className="event-detail__details">
                <h4 className="event-detail__content-title">Thể loại</h4>
                <p>{data.category}</p>
              </Grid>
            </Grid>
          </Container>

          {/* Top info for tablet + mobile screens */}
          <Box className="event-detail__top-desc container hide-on-pc">
            <Box className="event-detail__desc-left">
              <p>
                <FontAwesomeIcon className="event-detail__desc-icon" icon={faHeart} />
                Rating: {data.danhGia}
              </p>
              <p>{data.hot && "Hot"}</p>
            </Box>
            <Box className="event-detail__desc-right">{renderSocialBtn()}</Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default EventDetailsPage;
