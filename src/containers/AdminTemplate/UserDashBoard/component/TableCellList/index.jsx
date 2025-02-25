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
        {row.fullName}
      </TableCell>
      <TableCell className="management-table__table-cell table-cell__user-email">
        {row.email}
      </TableCell>
      <TableCell className="management-table__table-cell table-cell__user-phoneNo">
        {row.phoneNumber}
      </TableCell>
      <TableCell className="management-table__table-cell table-cell__user-isActive">
        {row.isActive ? "Đang hoạt động" : "Không hoạt động"}
      </TableCell>
      <TableCell
        align="right"
        sx={{ width: "150px" }}
        className="management-table__table-cell table-cell__management-actions"
      >
        <EditEventBtn onClick={() => handleEditEvent(row.id)} />
      </TableCell>
    </>
  );
};

export default UserTableCells;
