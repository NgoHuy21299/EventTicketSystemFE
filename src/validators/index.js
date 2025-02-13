import { addEventSchema, editEventSchema } from "./eventValidator";

import accountInfoSchema from "./accountInfoValidator";
import eventScheduleSchema from "./eventScheduleValidator";
import loginSchema from "./login";
import registerSchema from "./register";
import userSchema from "./userValidator";

export {
loginSchema,
  registerSchema,
  editEventSchema,
  addEventSchema,
  userSchema,
  accountInfoSchema,
  eventScheduleSchema,
};
