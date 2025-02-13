import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { AddItemBtn } from "../components/Buttons";
// Material UI
import { Container } from "@mui/system";
import MuiEnhancedTable from "../components/MuiEnhancedTable";
//Components
import SearchBar from "../components/SearchBar";
import UserModal from "./component/UserModal";
import UserTableCells from "./component/TableCellList";
//Others
import actGetUserList from "@/store/actions/userList";
import { actUserDetailsSuccess } from "@/store/actions/userDetails";
import headCells from "./constants";

function UserDashBoard() {
  const [openModalUser, setOpenModalUser] = useState(false);

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.data);
  const updateUser = useSelector((state) => state.userDetails.data);
  const userListLoading = useSelector((state) => state.userList.loading);

  useEffect(() => {
    dispatch(actGetUserList());
  }, [updateUser]);

  const handleSearch = (value) => {
    dispatch(actGetUserList(value));
    dispatch(actUserDetailsSuccess(userList));
  };

  return (
    <>
      <Container
        sx={{
          overflow: "hidden",
        }}
      >
        <SearchBar onSubmit={handleSearch} className="event-dashboard__search" />
        <AddItemBtn onClick={() => setOpenModalUser(true)}>Thêm người dùng</AddItemBtn>
        <MuiEnhancedTable
          headCells={headCells}
          dataList={userList}
          TableCellList={UserTableCells}
          tableType="user"
          loading={userListLoading}
        />
      </Container>
      <UserModal
        openModalUser={openModalUser}
        setOpenModalUser={setOpenModalUser}
        title="Thêm người dùng"
        button="Thêm người dùng"
        modalType="addUser"
      />
    </>
  );
}

export default UserDashBoard;
