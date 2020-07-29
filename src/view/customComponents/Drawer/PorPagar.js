import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Box, Typography, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import qrcodeKamba from "../../../assets/MyQrImageKamba.jpg";
import Link from "@material-ui/core/Link";

import { BAI_ACCOUNT_INFO } from '../../../utils/config/DadosBancarios';

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

const formaDePagamentoEnum = {
    KAMBA_APP: 'Kamba',
    Transferencia_bancaria: 'TB',
}

export default function DrawerBottomPaymentInfo({open, handleCloseDrawer, priceToPay, hashTagDownload, formaDePagamento}) {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    let classes = useStyles();

    function getPaymentInfoContent(){ 
    
        if(formaDePagamentoEnum.KAMBA_APP === formaDePagamento){
            return (
                <>
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
                            <img src={qrcodeKamba} width={160} height={160} alt={'qrcodeKamba'}/>
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
                </>
            )
        }else if(formaDePagamentoEnum.Transferencia_bancaria === formaDePagamento){
            return (
                <>                  
                    <Typography className={classes.textoResponsivo} color='textSecondary' style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                        Utilize os dados bancários abaixo, para fazer o pagamento do produto. Após efetuar o pagamento, envie-nos uma foto do comprovativo através das nossas redes socias.
                    </Typography>
                    <Typography className={classes.textoResponsivo} style={{marginTop: 16, marginLeft: 16, marginRight: 16}}>
                        <b>IBAN:</b> {BAI_ACCOUNT_INFO.IBAN}
                    </Typography>
                    <Typography className={classes.textoResponsivo} style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                        <b>Banco: </b>{BAI_ACCOUNT_INFO.NOME}
                    </Typography>
                    <Typography className={classes.textoResponsivo} style={{marginTop: 0, marginLeft: 16, marginRight: 16}}>
                        <b>Titular:</b> {BAI_ACCOUNT_INFO.TITULAR}
                    </Typography>
                    <Typography className={classes.textoResponsivo} style={{marginTop: 1, marginLeft: 16, marginRight: 16}}>
                        <b>Total a pagar:</b> {priceToPay} Kz
                    </Typography>        
                </>
            )
        }else{
            return <Typography align='center'><br/>Ophs! Ocorreu um erro desconhecido...<br/></Typography>
        }
    }



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

            {getPaymentInfoContent()}

            <Button onClick={handleCloseDrawer} style={{boxShadow: 'none', margin: 16, color: '#fff'}} variant='contained' color='primary'>Entendi</Button>
            
        </SwipeableDrawer>
    );
}
