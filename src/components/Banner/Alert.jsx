import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import { CryptoState } from "../CryptoContext";

import { CryptoState } from "../../CryptoContext";

// ForwardRef wrapper for MUI Alert
const AlertComponent = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});

export default function Alert() {
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <AlertComponent onClose={handleCloseAlert} severity={alert.type}>
        {alert.message}
      </AlertComponent>
    </Snackbar>
  );
}
