import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import "./Header.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { Backdrop } from "@mui/material";
import { useToasts } from "@geist-ui/core";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../AxiosApi/UserApi";
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const { setToast } = useToasts();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const actions = [
    { icon: <ListAltIcon />, name: "Orders", func: Orders },
    { icon: <PersonIcon />, name: "Profile", func: Profile },
    { icon: <ExitToAppIcon />, name: "Logout", func: Logout },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: Dashboard,
    });
  }
  function Dashboard() {
    navigate("/dashboard");
  }
  function Orders() {
    navigate("/orders");
  }
  function Profile() {
    navigate("/account");
  }
  function Logout() {
    dispatch(logoutUser());
    setToast({
      text: "Logged out successfully",
      type: "success",
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        direction="down"
        className="speedDial"
        ariaLabel="SpeedDial basic example"
        style={{ zIndex: "11" }}
        // sx={{ position: "absolute", top: -200, right: 10 }}
        icon={
          <img
            className="speedDialIcon"
            src={
              user.avatar.url ? user.avatar.url : "../../../assets/profile.png"
            }
            alt="profile"
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
