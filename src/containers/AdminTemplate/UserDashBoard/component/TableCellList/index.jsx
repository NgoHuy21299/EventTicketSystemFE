//Others
import "./style.scss";

// Components
import { DeleteEventBtn, EditEventBtn } from "../../../components/Buttons";

import { TableCell } from "@mui/material";

const UserTableCells = (props) => {
  const { row, index, labelId, handleDeleteEvent, handleEditEvent } = props;
  return (
    <>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        className="management-table__table-cell table-cell__user-number"
      >
        {index}
      </TableCell>
      <TableCell
        sx={{ width: "200px", height: "100px" }}
        className="management-table__table-cell table-cell__user-account"
      >
        {row.taiKhoan}
      </TableCell>
      <TableCell
        align="left"
        sx={{ width: "200px", height: "100px" }}
        className="management-table__table-cell table-cell__user-password"
      >
        {row.matKhau}
      </TableCell>
      <TableCell className="management-table__table-cell table-cell__user-email">
        {row.email}
      </TableCell>
      <TableCell className="management-table__table-cell table-cell__user-phoneNo">
        {row.soDT}
      </TableCell>
      <TableCell
        align="right"
        sx={{ width: "150px" }}
        className="management-table__table-cell table-cell__management-actions"
      >
        <DeleteEventBtn onClick={() => handleDeleteEvent(row.taiKhoan)} />
        <EditEventBtn onClick={() => handleEditEvent(row.taiKhoan)} />
      </TableCell>
    </>
  );
};

export default UserTableCells;
