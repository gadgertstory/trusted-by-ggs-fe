import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = ({
  open,
  onClose,
  title,
  description,
  buttonConfirmText,
  buttonCancelText,
  onConfirmed,
  buttonConfirmStyle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button onClick={onClose} sx={{ backgroundColor: '#E5EAEE', color: '#000' }}>
          {buttonCancelText}
        </Button>
        <Button onClick={onConfirmed} autoFocus variant='contained' sx={buttonConfirmStyle}>
          {buttonConfirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.node,
  buttonConfirmText: PropTypes.string,
  buttonCancelText: PropTypes.string,
  onConfirmed: PropTypes.func,
  buttonConfirmStyle: PropTypes.object,
};

ConfirmDialog.defaultProps = {
  title: 'แจ้งเตือน',
  buttonConfirmText: 'ตกลง',
  buttonCancelText: 'ยกเลิก',
};

export default ConfirmDialog;
