import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Box, Typography, Button, Link } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import { BFA_ACCOUNT_INFO } from "../../../utils/config/DadosBancarios";

const useStyles = makeStyles(theme => ({
    textoResponsivo: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.down('md')]: {
            textAlign: 'justify',
        },
    },
})); 


export default function DrawerBottomPaymentInfo({open, handleCloseDrawer, priceToPay, hashTagDownload}) {
    let classes = useStyles();

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onOpen={ () => {}}
            onClose = {handleCloseDrawer}>
            
            <Box m={2} textAlign={'center'} fontFamily="fontFamily" fontWeight={550} fontSize={"h6.fontSize"}>
                Você ainda não pagou pelo seu download
            </Box>

            <Typography className={classes.textoResponsivo} color='textSecondary' style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                Utilize os dados bancários abaixo, para fazer o pagamento do seu download. Após efetuar o pagamento, envie-nos uma foto do comprovativo com a Hashtag <b>#{hashTagDownload}</b> nas nossa <a href='https://lubeasy.herokuapp.com/about' target='_blank' rel='noopener'>Redes Socias</a>.
            </Typography>
            <Typography className={classes.textoResponsivo} style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                <b>IBAN:</b> {BFA_ACCOUNT_INFO.IBAN}
            </Typography>
            <Typography className={classes.textoResponsivo} style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                <b>Banco: </b>{BFA_ACCOUNT_INFO.NOME}
            </Typography>
            <Typography className={classes.textoResponsivo} style={{marginTop: 0, marginLeft: 16, marginRight: 16}}>
                <b>Titular:</b> {BFA_ACCOUNT_INFO.TITULAR}
            </Typography>
            <Typography className={classes.textoResponsivo} style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                <b>Total a pagar:</b> {priceToPay} Kz
            </Typography>
            
            
            <Button onClick={handleCloseDrawer} style={{boxShadow: 'none', margin: 16, color: '#fff'}} variant='contained' color='secondary'>Entendi</Button>
            
        </SwipeableDrawer>
    );
}
