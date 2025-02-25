import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

//Formik
import { Formik, useFormik } from "formik";

//Material UI
import Modal from "@mui/material/Modal";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";

//Components
import { SubmitButton } from "@/containers/AdminTemplate/components/Buttons";
import Loader from "@/components/Loader";

//Others
import "./style.scss";
import { userSchema } from "@/validators";
import { GROUP_ID, ROLE_ENUM } from "@/constants";
import { userApi } from "@/api";
import actGetUserDetails from "@/store/actions/userDetails";
import { useRef } from "react";

/** todo
 * đỏi trạng thái
phân quyền event controller
bỏ nút xoá
reload on register
 */ 

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserModal(props) {
  const { openModalUser, setOpenModalUser, title, button, data, loading, userAccount, modalType, onSubmitSuccess } =
    props;

  const [submitError, setSubmitError] = React.useState("");
  const form = useRef();

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModalUser(false);
    resetForm();
  };

  let userEdit;
  if (data) {
    userEdit = data;
  }

  const initialValuesAddUser = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    isActive: true,
  };

  const initialValuesEditUser = {
    id: userAccount,
    fullName: userEdit?.fullName,
    email: userEdit?.email,
    phoneNumber: userEdit?.phoneNumber,
    role: userEdit?.role ?? ROLE_ENUM.CLIENT,
    isActive: userEdit?.isActive ?? true,
  };

  const initialValues = modalType === "addUser" ? initialValuesAddUser : initialValuesEditUser;

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
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (modalType === "addUser") {
        const fetchData = async () => {
          try {
            await userApi.addUser(values);
            dispatch(actGetUserDetails(values.id));
            setOpenModalUser(false);
            resetForm();
            setSubmitError("");
            onSubmitSuccess();
          } catch (error) {
            setSubmitError(error);
          }
        };
        fetchData();
      } else {
        const fetchData = async () => {
          try {
            await userApi.editUser(userAccount, values);
            dispatch(actGetUserDetails(values.id));
            setOpenModalUser(false);
            resetForm();
            setSubmitError("");
            onSubmitSuccess();
          } catch (error) {
            setSubmitError(error);
          }
        };
        fetchData();
      }
    },
  });

  const handleChangeSelect = (e) => {
    setFieldValue("role", e.target.value);
  };

  const handleChangeSelectStatus = (e) => {
    setFieldValue("isActive", e.target.value);
  };
  return (
    <Modal
      open={openModalUser}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="user-modal">
        <Typography variant="h5" component="h2" id="modal-modal-title">
          {title}
        </Typography>
        {submitError ? (
          <Alert severity="error" sx={{ my: 3 }}>
            {submitError}
          </Alert>
        ) : (
          ""
        )}
        {loading ? (
          <Loader />
        ) : (
          <Formik>
            <Box ref={form} sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="user-name">Họ và tên</FormLabel>
                <TextField
                  name="fullName"
                  id="user-name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  error={errors.fullName && touched.fullName ? true : false}
                />
                {errors.fullName && touched.fullName && (
                  <FormHelperText error>{errors.fullName}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="user-email">Email</FormLabel>
                <TextField
                  name="email"
                  id="user-email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email ? true : false}
                />
                {errors.email && touched.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>
              {modalType === "addUser" && (
                <FormControl fullWidth className="form__input-wrapper">
                  <FormLabel htmlFor="user-password">Mật khẩu</FormLabel>
                  <TextField
                    name="password"
                    id="user-password"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                  />
                  {errors.password && touched.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>
              )}
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="user-phoneNo">Số điện thoại</FormLabel>
                <TextField
                  name="phoneNumber"
                  id="user-phoneNo"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  error={errors.phoneNumber && touched.phoneNumber ? true : false}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <FormHelperText error>{errors.phoneNumber}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="user-type">Loại người dùng</FormLabel>
                <Select
                  name="role"
                  id="user-type"
                  variant="outlined"
                  onChange={handleChangeSelect}
                  value={values.role}
                  error={errors.role && touched.role ? true : false}
                >
                  <MenuItem value={ROLE_ENUM.CLIENT}>Người dùng</MenuItem>
                  <MenuItem value={ROLE_ENUM.ADMIN}>Quản trị</MenuItem>
                </Select>
                {errors.role && touched.role && (
                  <FormHelperText error>{errors.role}</FormHelperText>
                )}
              </FormControl>
              {modalType === "editUser" && (
                <FormControl fullWidth className="form__input-wrapper">
                  <FormLabel htmlFor="user-status">Trạng thái</FormLabel>
                  <Select
                    htmlFor="user-status"
                    name="isActive"
                    id="user-status"
                    variant="outlined"
                    onChange={handleChangeSelectStatus}
                    value={values.isActive}
                    error={errors.isActive && touched.isActive ? true : false}
                  >
                    <MenuItem value={true}>Đang hoạt động</MenuItem>
                    <MenuItem value={false}>Không hoạt động</MenuItem>
                  </Select>
                  {errors.isActive && touched.isActive && (
                    <FormHelperText error>{errors.isActive}</FormHelperText>
                  )}
                </FormControl>
              )}
              <Box>
                <SubmitButton sx={{ py: 1, mt: 2 }}>{button}</SubmitButton>
              </Box>
            </Box>
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default UserModal;
