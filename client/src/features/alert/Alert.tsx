//! Alerts will be called twice in development, once in production, because in development,
//! since the app is in StrictMode, React checks the purity of all reducers twice, so the action is
//! dispatched twice

import React, { Fragment } from "react";

import { IAlert, removeAlert, removeAlertAsync } from "./alertSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Alert: React.FC = () => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector((state) => state.alert);

  const handleDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(removeAlert());
  };

  alerts && dispatch(removeAlertAsync());

  const alertItems =
    alerts &&
    alerts.map((alert: IAlert) => {
      let icon;
      switch (alert.alertType) {
        case "success":
          icon = "fas fa-check-circle";
          break;
        case "danger":
          icon = "fas fa-exclamation-triangle";
          break;
        default:
          icon = null;
      }
      return (
        <div className="alert-container">
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <div className="alert__message">
              {icon && <i className={icon}></i>}
              {alert.msg}
            </div>
            {alert.alertType === "danger" && (
              <div className="alert__dismiss">
                <div onClick={handleDismiss}>Dismiss</div>
              </div>
            )}
          </div>
        </div>
      );
    });
  return <Fragment>{alertItems}</Fragment>;
};

export default Alert;
