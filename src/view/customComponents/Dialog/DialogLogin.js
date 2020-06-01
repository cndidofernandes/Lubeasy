import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import LoginPage from "../../pages/LoginPage";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogSignInParceiro({open, location, handleClose, onSucess}) {

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar position={"relative"} style={{background: '#FFFFFF', boxShadow:'none'}}>
                    <Toolbar>
                        <IconButton edge="start" style={{color: 'black'}} onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="subtitle1" style={{marginLeft: 16, flex: 1, color: '#515149'}}>
                            Faça primeiro o login
                        </Typography>
                    </Toolbar>
                </AppBar>

                <LoginPage location={location} redirectUrl={'/produto'}/>

            </Dialog>
            
        </div>
    );
}

//index === 1 ? label+' ('+qtd+')' : label