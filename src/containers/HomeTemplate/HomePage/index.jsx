import "./style.scss";

import Carousel from "@/containers/HomeTemplate/HomePage/Carousel";
import EventList from "./EventList";

function HomePage() {
  return (
    <div id="home-page">
      <Carousel />
      <EventList />
    </div>
  );
}

export default HomePage;
