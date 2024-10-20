// src/components/SnackbarNotification.jsx
import React from 'react';
import { Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

const SnackbarNotification = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            message={message}
            severity={severity}
        />
    );
};

SnackbarNotification.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SnackbarNotification;
