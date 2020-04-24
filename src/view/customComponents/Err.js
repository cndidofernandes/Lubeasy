import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Box } from '@material-ui/core';
import WifiOffIcon from '@material-ui/icons/WifiOff';



export default function Err(props) {
    const err = props.err;
    
    //const messageUnauthorization = <LinkCustom path='/login' text="Por favor, faça primeiro o login." />
    const messageUnauthorization = "Algo muito estralho esta a passar-se, por favor recarrege a página. "
    var elementErr = null;
    //var elementIcon =<CloseIcon color='secondary'/>;
    var elementIcon = null;

    if (err.response) {
        elementErr = <Box m={1} fontSize="subtitle1.fontSize" textAlign="center">{err.response.status === 401 ? messageUnauthorization : err.response.data.description}</Box>
    }else if (err.request) {
        elementErr = <Box m={1} fontSize="subtitle1.fontSize" textAlign="center">{'Ophs, estamos com problemas na conexão com o servidor, por favor verifique a sua conexão com internet.'}</Box>
        elementIcon = <WifiOffIcon color='secondary'/>
    }else {
        elementErr = <Box m={1} fontSize="subtitle1.fontSize" textAlign="center">{'Ophs, ocorreu um erro desconhecido.'}</Box>
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 32}}>
            <Grid>
                {elementIcon}
            </Grid>
            <Grid item>   
                {elementErr}
            </Grid>
            
        </Grid>
    );
}
