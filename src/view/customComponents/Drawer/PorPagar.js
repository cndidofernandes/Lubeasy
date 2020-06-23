import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Box, Typography, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import qrcodeKamba from "../../../assets/MyQrImageKamba.jpg";
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


export default function DrawerBottomPaymentInfo({open, handleCloseDrawer, priceToPay, hashTagDownload}) {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    let classes = useStyles();

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onOpen={ () => {}}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            onClose = {handleCloseDrawer}>

            <Box mx={2} textAlign={'center'} fontFamily="fontFamily" fontWeight={550} fontSize={"h6.fontSize"}>
                <br/>
                Você ainda não fez o pagamento? Pague já!
            </Box>

            <Typography className={classes.textoResponsivo} color='textSecondary' style={{marginTop: 10, marginLeft: 16, marginRight: 16}}>
                Utilize o link ou Código Qr abaixo para pagar o produto e usufruir o máximo dele:
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
                <b>Hashtag da seu compra: </b>#{hashTagDownload}
            </Typography>
            <Typography align={'center'} variant={'subtitle2'} style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                <b>Valor á pagar: </b>{priceToPay} Kz
            </Typography>

            <Typography className={classes.textoResponsivo} variant='caption' color={'textSecondary'} style={{marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16}}>
                OBS: Não se esqueça de adicionar na descrição do pagamento a hashtag(<b>#{hashTagDownload}</b>) da sua compra.
            </Typography>
            {/*<Typography className={classes.textoResponsivo} variant='body2' style={{marginLeft: 16, marginRight: 16}}>
                Tem alguma dúvida de como fazer o pagamento? <a href="#https://www.w3schools.com/" target="_blank">Clique
                aqui</a>
            </Typography>*/}

            {/*<Typography className={classes.textoResponsivo} color='textSecondary'
                         style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                Utilize os dados bancários abaixo, para fazer o pagamento do seu download. Após efetuar o pagamento,
                envie-nos uma foto do comprovativo com a Hashtag <b>#{hashTagDownload}</b> nas nossa <a
                href='https://lubeasy.herokuapp.com/about' target='_blank' rel='noopener'>Redes Socias</a>.
            </Typography>
                <Typography className={classes.textoResponsivo} style={{
                marginTop: 16,
                marginLeft: 16,
                marginRight: 16
            }}>
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
            */}
            <Button onClick={handleCloseDrawer} style={{boxShadow: 'none', margin: 16, color: '#fff'}} variant='contained' color='primary'>Entendi</Button>
            
        </SwipeableDrawer>
    );
}
