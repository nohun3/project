import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from '@/context/AppContext';

export default function TransitionAlerts() {
  const {isAlert, setIsAlert, alertMessage, setAlertMessage, alertServerity, setAlertServerity} = React.useContext(AppContext);

  return (
    <Box sx={{ width: '70vh', position: "absolute", top: "-1px" }}>
      <Collapse in={isAlert}>
        <Alert
          severity={alertServerity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}