import * as React from "react";
import TextField from "@mui/material/TextField";
import {  DateTimePicker } from "@mui/x-date-pickers";

export default function MuiDatePicker({ value, onChange }) {
  return (
    <DateTimePicker
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
