import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Button, Tab, Tabs, AppBar, Box } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState();
  const googleProvider = new GoogleAuthProvider();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => setValue(newValue);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: 85,
          height: 40,
          ml: 2,
          backgroundColor: "#EEBC1D",
          "&:hover": { backgroundColor: "#d4a617" },
        }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              color: "white",
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <AppBar
              position="static"
              sx={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderRadius: 2 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            <Box
              sx={{
                p: 3,
                pt: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 2,
                fontSize: 20,
              }}
            >
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none"   }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
