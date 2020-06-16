import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorIcon from '@material-ui/icons/Error';
import {makeStyles} from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import qrcodeKamba from '../../../assets/MyQrImageKamba.jpg';

import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    textoResponsivo: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.only('xs')]: {
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

const ContentSuccess = ({priceToPay, hashTagDownload = 0}) => {
    let classes = useStyles();
    let history = useHistory();

    return (
        <>
            <br/>
            <Box textAlign={'center'} fontSize={60} color={'textSecondary'}>
                <CheckCircleRoundedIcon style={{color: '#00e700'}} fontSize={'inherit'}/>
            </Box>
            <Box textAlign={'center'} mx={1} fontFamily="fontFamily" fontWeight={550} fontSize={"h6.fontSize"}>
                O pedido de compra do produto foi efectuado com sucesso.
            </Box>

            <Typography className={classes.textoResponsivo} color='textSecondary' style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                Primeiro passo concluído! Agora, utilize o link ou Código Qr abaixo, para pagar o produto e usufruir o máximo dele:
            </Typography>

            <Typography align={'center'} style={{marginTop: 8, marginLeft: 16, marginRight: 16}}>
                <Link
                    href="https://www.usekamba.com/u/lubeasy_startup"
                    target={'_blank'}
                    rel="noreferrer">
                    https://www.usekamba.com/u/lubeasy_startup
                </Link>
            </Typography>

            <Box display={'flex'} justifyContent={'center'} style={{marginTop: 4, marginLeft: 16, marginRight: 16}}>
                <img src={qrcodeKamba} width={160} height={160} />
            </Box>

            <Typography align={'center'} variant={'subtitle2'} style={{marginTop: 4, marginLeft: 16, marginRight: 16}}>
                <b>Hashtag do seu download: </b>#{hashTagDownload}
            </Typography>
            <Typography align={'center'} variant={'subtitle2'} style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                <b>Valor á pagar: </b>{priceToPay} Kz
            </Typography>

            <Typography className={classes.textoResponsivo} variant='caption' color={'textSecondary'} style={{marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16}}>
                OBS: Não se esqueça de adicionar na descrição do pagamento a hashtag(<b>#{hashTagDownload}</b>) do seu download.
            </Typography>

            {/*<Typography className={classes.textoResponsivo} variant='body2'
                         style={{marginTop: 6, marginLeft: 16, marginRight: 16}}>
                Tem alguma dúvida de como fazer o pagamento? <a href="#https://www.w3schools.com/" target="_blank">Clique
                aqui</a>
            </Typography>*/}

            <Button onClick={() => history.replace('/minhas-compras')} style={{margin: 16}} variant='contained' color='primary' disableElevation>IR PARA AS MINHAS COMPRAS</Button>
        </>
    )
}

/*const ContentSuccess = ({priceToPay}) => {
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
} */


export default function DrawerBottomPaymentInfo({errInfo, open, priceToPay, hashTagDownload}) {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    var [openInner, setOpenInner] = React.useState(open) 
    const handleClose = () => setOpenInner(false);

    return (
        <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor="bottom"
            open={openInner}
            onOpen={ () => {}}
            onClose={handleClose}>
            {errInfo ? <ContentErr errInfo={errInfo} handleClose={handleClose} /> : <ContentSuccess priceToPay={priceToPay} hashTagDownload={hashTagDownload}/>}
        </SwipeableDrawer>
    );
}