import * as actType from "../constants/baseAuth";

const actUpdateRoleBase = (data) => {
  return {
    type: actType.UPDATE_ROLE_BASE,
    payload: data,
  };
};

export default actUpdateRoleBase;
