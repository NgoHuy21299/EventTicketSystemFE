import React, { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import "./style.scss";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
  { id: "ticket-id", label: "Mã vé", align: "center", minWidth: 80 },
  { id: "event-name", label: "Tên sự kiện", align: "center", minWidth: 100 },
  { id: "showtime", label: "Ngày diễn ra", align: "center", minWidth: 170 },
  {
    id: "venue",
    label: "Địa chỉ",
    align: "center",
    minWidth: 100,
  },
  { id: "ticket-cost", label: "Giá vé", align: "center", minWidth: 120 },
  {
    id: "selected-seats",
    label: "Ghế đã đặt",
    align: "center",
    minWidth: 195,
  },
  {
    id: "payment-status",
    label: "Trạng thái thanh toán",
    align: "center",
    minWidth: 195,
  },
];

const TransactionHistory = () => {
  const { content } = useSelector((rootReducer) => rootReducer.userProfile.data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const rows = content?.bookings;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  const renderTableBody = () =>
    (rowsPerPage > 0
      ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows
    )?.map((row) => {
      let seats = row?.tickets;

      seats = seats.map((seat, idx) => {
        const seatCode = seat.row + seat.number;

        const isLastSeat = idx === seats.length - 1;

        return (
          <span key={idx}>
            {seatCode}
            {isLastSeat ? "" : ", "}
          </span>
        );
      });

      let status = row?.status;
      if (status === "Success") {
        status = "Đã thanh toán";
      } else if (status === "Failed") {
        status = "Thanh toán thất bại";
      } else {
        status = "Đang chờ thanh toán";
      }

      return (
        <TableRow key={row.bookedAt}>
          <TableCell align="center">
            <span onClick={() => handleTicketClick(row?.tickets)} style={{ cursor: "pointer", color: "blue" }}>
              {row?.bookingId}
            </span>
          </TableCell>
          <TableCell align="center">{row?.eventName}</TableCell>
          <TableCell align="center">{row?.eventDate}</TableCell>
          <TableCell align="center">{row?.venue}</TableCell>
          <TableCell align="center">{row?.totalAmount?.toLocaleString()} VNĐ</TableCell>
          <TableCell align="center">{seats}</TableCell>
          <TableCell align="center">{status}</TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <TableContainer component={Paper} className="transaction-history">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className="transaction-history__table-head-cell"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2" align="center">
            Mã vé của bạn
          </Typography>
          {selectedTicket?.map((ticket, idx) => (
            <Typography key={idx} sx={{ mt: 2 }}>
              {ticket.row}{ticket.number}: {ticket.ticketNumber}
            </Typography>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="contained" onClick={handleClose}>Đóng</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TransactionHistory;
