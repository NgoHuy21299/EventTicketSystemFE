// Others
import "./style.scss";

// Material UI
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DEFAULT_CATEGORY, GROUP_ID } from "@/constants";
// formik
import { Formik, useFormik } from "formik";
import { actFetchEventAdd, actFetchEventEdit } from "@/store/actions/eventManagement";
import { addEventSchema, editEventSchema } from "@/validators";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Image from "@/components/Image";
import InputAdornment from "@mui/material/InputAdornment";
// Components
import Loader from "@/components/Loader";
import MuiDatePicker from "@/components/MuiPicker";
import { SubmitButton } from "../../../components/Buttons";
import actFetchEventDetails from "@/store/actions/eventDetails";
import { eventApi } from "@/api";
// moment
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh", // Set max height for the modal
  overflowY: "auto", // Allow vertical scrolling
};

function EventModal(props) {
  const { openModalEvent, setOpenModalEvent, title, button, data, loading, eventId, modalType } =
    props;
  const [imgSrc, setImgSrc] = useState(null);
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenModalEvent(false);
    resetForm();
  };

  const initialValuesAddEvent = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    venueName: "",
    venueAddress: "",
    category: "",
    artistInfo: "",
    imageUrls: "",
    totalTickets: 0,
    remainingTickets: 0,
    seatPrice: null,
    trailerUrls: "",
  };

  const initialValuesEditEvent = {
    id: eventId,
    name: data?.name,
    description: data?.description,
    startDate: data?.startDate,
    endDate: data?.endDate,
    venueName: data?.venueName,
    venueAddress: data?.venueAddress,
    category: DEFAULT_CATEGORY.MUSIC,
    // data?.category
    artistInfo: data?.artistInfo,
    imageUrls: data?.imageUrls,
    totalTickets: data?.totalTickets,
    remainingTickets: data?.remainingTickets,
    seatPrice: data?.seatPrice,
    trailerUrls: data?.trailerUrls,
  };

  let eventSchema = modalType === "addEvent" ? addEventSchema : editEventSchema;

  const fetchEventAdd = async (formData) => {
    try {
      await eventApi.addEvent(formData);
      setOpenModalEvent(false);
      window.location.reload();
    } catch (error) {
      setServerError(error);
    }
  };

  const fetchEventEdit = async (eventID, formData) => {
    try {
      await eventApi.editEvent(eventID, formData);
      setOpenModalEvent(false);
      document.location.reload();
    } catch (error) {
      setServerError(error);
    }
  };


  const {
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: modalType === "addEvent" ? initialValuesAddEvent : initialValuesEditEvent,
    validationSchema: eventSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      for (var key in values) {
        if (key !== "imageUrls") {
          formData.append(key, values[key]);
        } else {
          if (values.imageUrls !== null && values.imageUrls !== "") {
            formData.append("image", values.imageUrls);
          }
        }
      }

      if (modalType === "addEvent") {
        fetchEventAdd(formData);
      } else if (modalType === "editEvent") {
        values.id = eventId;
        fetchEventEdit(eventId, formData);
      }
    },
  });

  // useEffect(() => {
  //   if (eventId) {
  //     const formattedValue = new Intl.NumberFormat().format(data?.seatPrice);
      
  //     setFieldValue("seatPrice", formattedValue);
  //   }
  // }, data);

  const handleChangeNumberbox = (e) => {
    // Remove non-numeric characters (except for the decimal point)
    const rawValue = e.target.value.replace(/[^\d.-]/g, '');
    
    // Format the number with thousands separators
    const formattedValue = rawValue
      ? new Intl.NumberFormat().format(rawValue)
      : '';
      
      setFieldValue("seatPrice", formattedValue);
  };

  const handleChangeDatePicker = (date) => {
    let startDate = moment(date).toISOString();
    setFieldValue("startDate", startDate);
  };

  const handleChangeDatePickerEndDate = (date) => {
    let endDate = moment(date).toISOString();
    setFieldValue("endDate", endDate);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      setFieldValue(name, value.target.checked);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      setFieldValue("imageUrls", file);
    }
  };

  return (
    <Modal
      open={openModalEvent}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="event-modal">
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {title}
        </Typography>
        {serverError ? (
          <Alert severity="error" sx={{ my: 3 }}>
            {serverError}
          </Alert>
        ) : (
          ""
        )}
        {loading ? (
          <Loader />
        ) : (
          <Formik>
            <Box component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="event-form__input-label" htmlFor="event-name">
                  Tên sự kiện
                </FormLabel>
                <TextField
                  name="name"
                  id="event-name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={errors.name && touched.name ? true : false}
                />
                {errors.name && touched.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="event-form__input-label" htmlFor="event-desc">
                  Mô tả
                </FormLabel>
                <TextField
                  name="description"
                  id="event-desc"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={errors.description && touched.description ? true : false}
                />
                {errors.description && touched.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl>

              <FormControl className="form__input-wrapper">
                <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                  <FormLabel
                    className="event-form__input-label"
                    htmlFor="event-start-date"
                    sx={{ mr: 1 }}
                  >
                    Ngày bắt đầu
                  </FormLabel>

                  <MuiDatePicker
                    name="startDate"
                    id="event-start-date"
                    style={{ width: "fit-content" }}
                    onChange={handleChangeDatePicker}
                    onBlur={handleBlur}
                    value={values.startDate || null}
                  />
                </Box>
                {errors.startDate && touched.startDate && (
                  <FormHelperText error>{errors.startDate}</FormHelperText>
                )}
              </FormControl>

              <FormControl className="form__input-wrapper">
                <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                  <FormLabel
                    className="event-form__input-label"
                    htmlFor="event-end-date"
                    sx={{ mr: 1 }}
                  >
                    Ngày kết thúc
                  </FormLabel>

                  <MuiDatePicker
                    name="endDate"
                    id="event-end-date"
                    style={{ width: "fit-content" }}
                    onChange={handleChangeDatePickerEndDate}
                    onBlur={handleBlur}
                    value={values.endDate || null}
                  />
                </Box>
                {errors.endDate && touched.endDate && (
                  <FormHelperText error>{errors.endDate}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="event-form__input-label" htmlFor="venue-address">
                  Địa chỉ
                </FormLabel>
                <TextField
                  name="venueAddress"
                  id="venue-address"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.venueAddress}
                  error={errors.venueAddress && touched.venueAddress ? true : false}
                />
                {errors.venueAddress && touched.venueAddress && (
                  <FormHelperText error>{errors.venueAddress}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="event-form__input-label" htmlFor="trailer-urls">
                  Trailer URL
                </FormLabel>
                <TextField
                  name="trailerUrls"
                  id="trailer-urls"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.trailerUrls}
                  error={errors.trailerUrls && touched.trailerUrls ? true : false}
                />
                {errors.trailerUrls && touched.trailerUrls && (
                  <FormHelperText error>{errors.trailerUrls}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="event-form__input-label" htmlFor="seat-price">
                  Giá vé
                </FormLabel>
                <TextField
                  name="seatPrice"
                  id="seat-price"
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={handleChangeNumberbox}
                  onBlur={handleBlur}
                  value={values.seatPrice}
                  error={errors.seatPrice && touched.seatPrice ? true : false}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">₫</InputAdornment>,
                  }}
                />
                {errors.seatPrice && touched.seatPrice && (
                  <FormHelperText error>{errors.seatPrice}</FormHelperText>
                )}
              </FormControl>
              {/* Add more input fields similar to the ones above based on the event details */}

              <FormControl className="form__input-wrapper">
                <Box sx={{ flexDirection: "row" }}>
                  <FormLabel className="event-form__input-label" htmlFor="event-img" sx={{ mr: 1 }}>
                    Hình ảnh
                  </FormLabel>
                  <input
                    name="imageUrls"
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/png"
                    onChange={handleChangeFile}
                    onBlur={handleBlur}
                  />
                </Box>
                {errors.imageUrls && touched.imageUrls && (
                  <FormHelperText error sx={{ my: 1 }}>
                    {errors.imageUrls}
                  </FormHelperText>
                )}
                <Image
                  src={imgSrc === null && modalType === "editEvent" ? data?.imageUrls : imgSrc}
                  alt="..."
                  className="modal__img"
                />
              </FormControl>

              <Box sx={{ mt: 2 }}>
                <SubmitButton>{button}</SubmitButton>
              </Box>
            </Box>
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default EventModal;
