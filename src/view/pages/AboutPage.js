import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";
import CardPage from './CardPage';
import AppLogoFull from './../../assets/full_logo.png'
import DisablableButton from "../customComponents/DisablableButton";
import {becomeClienteAutor} from "../../services/Cliente";
import PageSnackBar from "../customComponents/PageSnackBar";

export default function AboudPage(props) {
    const [isBecomingClienteAutor, setIsBecomingClienteAutor] = React.useState(false);
    const [snackBarOpened, setSnackBarOpened] = React.useState(false);
    const [messageSnackBar, setMessageSnackBar] = React.useState(null);

    const onClickBecomeClienteAutorButton = () => {
        setIsBecomingClienteAutor(true);

        becomeClienteAutor( (response) => {

            setIsBecomingClienteAutor(false);
            setSnackBarOpened(true);
            setMessageSnackBar('O seu pedido foi realizado com sucesso em breve nós entraremos em contacto consigo. Obrigado.');

        }, (error) => {

            if(error.response){
                if(error.response.data.code === 'ER_DUP_ENTRY'){
                    setMessageSnackBar('Você já fez o pedido para se tornar um facilitador.');
                }else{
                    setMessageSnackBar('Ocorreu um erro ao realizar o seu pedido.');
                }
            }else{
                setMessageSnackBar('Estamos com problemas na conexão com o servidor.');
            }

            setIsBecomingClienteAutor(false);
            setSnackBarOpened(true);
        })

    }



  return (
    <>
        <AppBarWithBackButton titulo='Sobre'/>
        <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 16}}>
            <Grid item xs={12} md={9} lg={6}>
                <br/>
                <img src={AppLogoFull} alt={'applogo'}/>
            </Grid>

            <Grid item xs={12} md={9} lg={6}>  
              <br/> 
              <Typography variant="subtitle2">Versão 0.0.1</Typography>
            </Grid>

            <Grid item xs={12} md={9} lg={6}>   
              <Typography variant="subtitle1" onClick={() => props.history.push('/website/termos')} color='secondary'>Termos e Condições De Utilização</Typography>
            </Grid>

            <br/><br/>

            <Grid item xs={12} md={9} lg={6}>   
              <Typography variant="h6">Suporte:</Typography>
            </Grid>
            <br/>
            <CardPage disabledAction={true} />

        </Grid>
        <Typography align={'center'} style={{margin: 8}}>
            <DisablableButton disabled={isBecomingClienteAutor}
                              onClick={onClickBecomeClienteAutorButton}
                              color={'primary'}
                              size={'small'}>
                Quero tornar-me num facilitador
            </DisablableButton>
        </Typography>
        <PageSnackBar snackBarOpened={snackBarOpened} handleClose={() => setSnackBarOpened(false)} message={messageSnackBar}/>
    </>
  );
}
