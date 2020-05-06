import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {makeStyles} from "@material-ui/core/styles/";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles(theme=>({
    appBar:{
        top:0,
        left:0,
        color:'black',
        background: '#FFFFFF',
        boxShadow: 'none',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: grey[100]
    },
    iconButton: {
        marginRight: theme.spacing(2)
    },
    titulo:{
        flexGrow:1
    }
}));

export default function AppBarWithBackButton(props) {
    const classes = useStyles();
    let history = useHistory()

    const registerPastLocation = useSelector((state) =>{
        return state.registerPastLocation;
    });

    const handleButtonBack = () => {
        if( registerPastLocation === 0 && !props.isGoBack ){
            history.replace('/home');
        }else{
            history.goBack();
        }
    }

    return (
        <AppBar className={classes.appBar}
                position={"static"}
                style={{color:'black', background: '#FFFFFF', boxShadow: 'none'}}>
            <Toolbar>
                <IconButton disabled={props.disabled ? props.disabled : false} onClick={handleButtonBack} edge={'start'} className={classes.iconButton}>
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
            
                <Typography className={classes.titulo} variant={'subtitle1'} style={{color: '#515149'}}>
                    {props.titulo}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};