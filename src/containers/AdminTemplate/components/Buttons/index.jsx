// Scss
import "./style.scss";

import { Button, IconButton } from "@mui/material";

import { BorderColor } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
// Material UI
import { LoadingButton } from "@mui/lab";

const SubmitButton = ({ children, onClick, ...others }) => (
  <LoadingButton
    onClick={onClick}
    {...others}
    className="modal__submit-btn"
    type="submit"
    variant="contained"
  >
    {children}
  </LoadingButton>
);

const AddItemBtn = ({ children, onClick, ...props }) => (
  <Button
    variant="contained"
    sx={{
      m: "5px 0 20px 0",
      backgroundColor: "var(--primary)",
      color: "var(--white)",
      "&:hover": {
        backgroundColor: "#caa100;",
      },
    }}
    onClick={onClick}
    {...props}
  >
    {children}
  </Button>
);

const EditEventBtn = (props) => (
  <IconButton color="info" {...props}>
    <BorderColor className="event-management__btn-icon" />
  </IconButton>
);

const DeleteEventBtn = (props) => (
  <IconButton color="error" {...props}>
    <DeleteIcon className="event-management__btn-icon" />
  </IconButton>
);

const CreateScheduleBtn = (props) => (
  <IconButton color="success" {...props}>
    <CalendarTodayIcon />
  </IconButton>
);

export { SubmitButton, EditEventBtn, DeleteEventBtn, AddItemBtn, CreateScheduleBtn };