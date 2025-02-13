import * as yup from "yup";
import pattern from "./pattern";
import msg from "./message";

const accountInfoSchema = yup.object({
  username: yup.string(),
  fullName: yup.string(),
  email: yup.string().required(msg.required).email(msg.email),
  phoneNumber: yup.string().required(msg.required).matches(pattern.phoneNumber, msg.phoneNumber),
  currentPasswordRef: yup.string(),
  currentPassword: yup.string().when("$allowChangePassword", {
    is: true,
    then: yup.string().required("Mật khẩu hiện tại không được bỏ trống")
  }),
  newPassword: yup.string().when("$allowChangePassword", {
    is: true,
    then: yup.string().required("Mật khẩu mới không được bỏ trống")
  }),
  confirmedNewPassword: yup.string().when("$allowChangePassword", {
    is: true,
    then: yup.string()
      .required("Xác nhận mật khẩu không được bỏ trống")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp")
  })
});

export default accountInfoSchema;
