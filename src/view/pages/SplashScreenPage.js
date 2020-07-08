import React from 'react';
import Grid from '@material-ui/core/Grid';
import appLogotipo from '../../assets/logo.png';
import withStyles from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        <Box component="div" bgcolor={'background.paper'}>
            <Grid style={{height:'100vh'}} container justify='center' alignItems='center'>
                <Grid item>
                    <img src={appLogotipo} alt={'logo-app'} style={{width: 77, height: 86}} />
                    <ColorLinearProgress />
                </Grid>
            </Grid>
        </Box>
    )
}
export default SplashScreen;