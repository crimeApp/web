import React, { useState } from 'react';
import { Button, 
  Dialog, 
  DialogTitle,
  DialogActions, 
  DialogContent,
  DialogContentText
 } from '@material-ui/core';
 import traslate from '../../assets/traslate/es.json';

export default function AlertDialog({ choice, handleAgreement, title, description }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Dialog
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgreement} color="primary" autoFocus>
            {traslate.COMMON.NEXT}
          </Button>
          <Button onClick={''} color="primary" autoFocus>
            Nope
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}