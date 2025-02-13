import "./style.scss";

import Carousel from "@/containers/HomeTemplate/HomePage/Carousel";
import CinemaSystem from "./CinemaSystem";
import EventList from "./EventList";

function HomePage() {
  return (
    <div id="home-page">
      <Carousel />
      <EventList />
      {/* <CinemaSystem /> */}
    </div>
  );
}

export default HomePage;
