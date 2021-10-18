import React, { Fragment, useState } from "react";
import MaterialUIAlert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Alert: React.FC<{ alertType: string; message: string }> = ({
  alertType,
  message,
}) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const handleCloseAlert = () => {
    setShowAlert(() => false);
  };
  return (
    <Fragment>
      {showAlert && (
        <MaterialUIAlert
          severity={(alertType as AlertColor) || "error"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </MaterialUIAlert>
      )}
    </Fragment>
  );
};

export default Alert;
