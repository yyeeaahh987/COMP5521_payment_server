import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from '../../hooks'

function NotificationSnackbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({ alertId: '', severity: '', message: '' });

  const sliceState = useAppSelector((state) => state.notificationSnackbar);

  if (!!sliceState.alertId && sliceState.alertId !== alertProps.alertId) {
    if (!!sliceState.severity && !!sliceState.message) {
      setAlertProps({
        alertId: sliceState.alertId,
        severity: sliceState.severity,
        message: sliceState.message,
      });
      setIsOpen(true);
    }
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => setIsOpen(false)}
    >
      <Alert
        onClose={() => setIsOpen(false)}
        severity={!alertProps.severity ? undefined : alertProps.severity as AlertColor}
        sx={{ width: '100%' }}
      >
        {alertProps.message}
      </Alert>
    </Snackbar>
  )
}

export default NotificationSnackbar;