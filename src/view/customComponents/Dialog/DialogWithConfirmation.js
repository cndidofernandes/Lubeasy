import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DisablableButton from "../DisablableButton";

export default function DialogWithConfirmation(props) {
    
    return (
        <div>
            <Dialog
                disableBackdropClick={props.disabled}
                disableEscapeKeyDown={props.disabled}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={props.disabled} onClick={props.handleClose} color="primary">
                        Não
                    </Button>
                    <DisablableButton disabled={props.disabled} onClick={props.onSuccess} color="primary" autoFocus>
                        Sim
                    </DisablableButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
