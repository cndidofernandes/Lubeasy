import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorIcon from '@material-ui/icons/Error';
import {makeStyles} from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

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

const ContentErr = ({errInfo, handleClose}) => {
    let classes = useStyles();
    return (
        <>
            <br/>
            <Box textAlign={'center'} fontSize={60} color={'textSecondary'}>
                <ErrorIcon color='error' fontSize={'inherit'}/>
            </Box>
            <Box textAlign={'center'} fontFamily="fontFamily" fontWeight={600} fontSize={"h6.fontSize"}>
                Ophs! Ocorreu um erro.
            </Box>
            
            <Typography className={classes.textoResponsivo} color='textSecondary' style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                { errInfo.response ? errInfo.response.data.description : (errInfo.request) ? 'Ophs, estamos com problemas na conexão com o servidor, por favor verifique a sua conexão com internet.' : 'Ophs, ocorreu um erro desconhecido.' }
            </Typography>

            <Button onClick={handleClose} style={{boxShadow: 'none', margin: 16}} variant='contained' color='primary'>Voltar</Button>
        </>
    )
}

const ContentSuccess = ({priceToPay}) => {
    let classes = useStyles();
    let history = useHistory();

    return (
        <>
            <br/>
            <Box textAlign={'center'} fontSize={60} color={'textSecondary'}>
                <CheckCircleRoundedIcon style={{color: '#00e700'}} fontSize={'inherit'}/>
            </Box>
            <Box textAlign={'center'} mx={0.9} fontFamily="fontFamily" fontWeight={600} fontSize={"h6.fontSize"}>
                O pedido de compra do produto foi efectuado com sucesso.
            </Box>
            
            <Typography className={classes.textoResponsivo} color='textSecondary' style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                Utilize os dados bancários abaixo, para fazer o pagamento do seu download. Após efetuar o pagamento, envie-nos uma foto do comprovativo através das nossas redes socias.
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
            <br/>
            <Typography className={classes.textoResponsivo} variant='body2' style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                Tem alguma dúvida como fazer o pagamento? <a href="#https://www.w3schools.com/" target="_blank">Clique aqui</a>
            </Typography>

            <Button onClick={() => history.replace('/meusdownloads')} style={{margin: 16}} variant='contained' color='primary' disableElevation>IR PARA AS MINHAS COMPAR</Button>
        </>
    )
} 


export default function DrawerBottomPaymentInfo({errInfo, open, priceToPay}) {

    var [openInner, setOpenInner] = React.useState(open) 
    const handleClose = () => setOpenInner(false);

    console.log(errInfo, openInner);
    

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={openInner}
            onOpen={ () => {}}
            onClose={handleClose}>
            {errInfo ? <ContentErr errInfo={errInfo} handleClose={handleClose} /> : <ContentSuccess priceToPay={priceToPay}/>}
        </SwipeableDrawer>
    );
}