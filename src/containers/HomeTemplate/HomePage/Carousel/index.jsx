// React Slick config
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Components
import Image from "@/components/Image";
import Loader from "@/components/Loader";
import Slider from "react-slick";
import actFetchBanners from "@/store/actions/eventBanner";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className} carousel__arrow carousel__arrow--next`} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className} carousel__arrow carousel__arrow--prev`} onClick={onClick} />;
}

function Carousel() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.eventBanner.data);
  const loading = useSelector((state) => state.eventBanner.loading);

  useEffect(() => {
    // dispatch(actFetchBanners());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: function () {
      return <FontAwesomeIcon className="home__carousel-indicator" icon={faCircle} />;
    },
    dotsClass: "slick-dots slick-thumb home__carousel-indicators",
  };

  const renderCarouselItem = () => {
    if (loading) return <Loader />;

    const carouselItem = data?.map((item) => (
      <Image key={item.maPhim} src={item.hinhAnh} className="home__carousel-img" />
    ));

    return <Slider {...settings}>{carouselItem}</Slider>;
  };

  return <div className="home__carousel">{renderCarouselItem()}</div>;
}

export default Carousel;
