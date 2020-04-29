import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {makeStyles} from "@material-ui/core/styles/";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    appBar:{
        top:0,
        left:0,
        background: '#FFFF'
    },
    iconButton: {
        marginRight: theme.spacing(2),
        color:'white'
    },
    titulo:{
        flexGrow:1
    }
}));

export default function TransparentAppBarWithBackButton(props) {
    const classes = useStyles();
    let history = useHistory();

    const handleButtonBack = () => {
        history.goBack();
    }

    return (
        <AppBar className={classes.appBar} style={{color:'white',background: 'linear-gradient(rgba(0, 0, 0, 0.1), transparent)', boxShadow:'none'}}>
            <Toolbar>
                <IconButton onClick={handleButtonBack} edge={'start'} className={classes.iconButton}>
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
                <Typography className={classes.titulo} variant={'h6'}>
                    {props.titulo}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};