import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        position: 'relative',
    }
}));

export default function DisablableButton(props){
    const classes = useStyles();
    const progress = <CircularProgress size={24} style={{position:'absolute', top:'50%', left:'50%',marginTop: -12,
    marginLeft: -12,}}/>
    return (
        <div className={classes.root}>
            <Button {...props}>{props.children}</Button>
            {props.disabledProgress !== undefined ? (props.disabledProgress ? progress : '') : (props.disabled ? progress : '')}
        </div>
    )
}