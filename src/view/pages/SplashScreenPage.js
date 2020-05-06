import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import appLogotipo from '../../assets/logo.png';
import withStyles from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';
import { Fade } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const CircularLogo = withStyles(theme => ({
    root: {
        width: 80,
        height: 80
    },
}))(Avatar);

const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#EFD307',
    },
    barColorPrimary: {
      backgroundColor: '#ffe000',
    },
})(LinearProgress);



function SplashScreen() {

    return (
        <Box component="div">
            <Fade in={true}>
                <Grid style={{height:'80vh'}} container justify='center' alignItems='center'>
                    <Grid item>
                        <CircularLogo src={appLogotipo}/>
                        <ColorLinearProgress />
                    </Grid>
                </Grid>
            </Fade>
        </Box>
    )
}
export default SplashScreen;