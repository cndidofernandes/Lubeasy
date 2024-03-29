import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

export default function PageSnackBar(props) {
    const classes = useStyles();


    return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={props.snackBarOpened}
                autoHideDuration={6000}
                onClose={props.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{props.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="secondary"
                        className={classes.close}
                        onClick={props.handleClose}
                    >
                        {props.icon ? props.icon : <CloseIcon />}
                    </IconButton>,
                ]}
            />
    );
}
