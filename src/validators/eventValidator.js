import * as yup from "yup";

import msg from "./message";

const editEventSchema = yup.object({
  name: yup.string().required(msg.required),
  description: yup.string().required(msg.required),
  startDate: yup.date().required(msg.required),
  endDate: yup.date().required(msg.required),
});

const addEventSchema = yup.object({
  name: yup.string().required(msg.required),
  description: yup.string().required(msg.required),
  startDate: yup.date().min(new Date(), 'Sự kiện phải có ngày lớn hơn hiện tại').required(msg.required),
  endDate: yup.date().min(new Date(), 'Sự kiện phải có ngày lớn hơn hiện tại').required(msg.required),
});

export { editEventSchema, addEventSchema };

// add these after add UI on form
// name: yup.string().required(msg.required),
//   description: yup.string().required(msg.required),
//   startDate: yup.string().required(msg.required),
//   endDate: yup.string().required(msg.required),
//   status: yup.string().required(msg.required),
//   venueAddress: yup.string().required(msg.required),
