import "./style.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddItemBtn } from "../components/Buttons";
import { Button } from "@mui/material";
// Material UI
import { Container } from "@mui/system";
import EventModal from "./components/EventModal";
import EventTableCells from "./components/EventTableCellList";
import MuiEnhancedTable from "../components/MuiEnhancedTable";
// Components
import SearchBar from "../components/SearchBar";
// Others
import actGetEventList from "@/store/actions/eventList";
import { headCells } from "./constants";

function EventDashBoard() {

  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const eventList = useSelector(
    (state) => {
      console.log(state?.eventList?.data);
      return state?.eventList?.data;
    }
  );
  const eventListLoading = useSelector((state) => state.eventList.loading);

  useEffect(() => {
    dispatch(actGetEventList());
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const filterRequest = {
      search: value
    };
    dispatch(actGetEventList(filterRequest));
  };

  const handleModalSubmitSuccess = () => {
    const filterRequest = {
      search: search
    };
    dispatch(actGetEventList(filterRequest)); // Refresh user list after form submission
  }; 

  return (
    <>
      <Container sx={{ overflow: "hidden" }}>
        <SearchBar onSubmit={handleSearch} className="event-dashboard__search" />
        <AddItemBtn onClick={() => setOpenModalEvent(true)}>Thêm sự kiện</AddItemBtn>
        <MuiEnhancedTable
          headCells={headCells}
          dataList={eventList}
          TableCellList={EventTableCells}
          tableType="event"
          onSubmitSuccess={handleModalSubmitSuccess}
          loading={eventListLoading}
        />
      </Container>
      <EventModal
        openModalEvent={openModalEvent}
        setOpenModalEvent={setOpenModalEvent}
        onSubmitSuccess={handleModalSubmitSuccess}
        title="Thêm sự kiện mới"
        button="Thêm sự kiện"
        modalType="addEvent"
      />
    </>
  );
}

export default EventDashBoard;
