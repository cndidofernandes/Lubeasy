import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';

import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";
import CardPage from './CardPage';
import AppLogoFull from './../../assets/full_logo.png'
import DisablableButton from "../customComponents/DisablableButton";
import {becomeClienteAutor} from "../../services/Cliente";
import PageSnackBar from "../customComponents/PageSnackBar";

import { useSelector } from 'react-redux';


export default function AboudPage(props) {
    const [isBecomingClienteAutor, setIsBecomingClienteAutor] = React.useState(false);
    const [snackBarOpened, setSnackBarOpened] = React.useState(false);
    const [messageSnackBar, setMessageSnackBar] = React.useState(null);

    const onClickBecomeClienteAutorButton = () => {
        /*setIsBecomingClienteAutor(true);

        becomeClienteAutor({name, email}, (response) => {

            setIsBecomingClienteAutor(false);
            setSnackBarOpened(true);
            setMessageSnackBar('O seu pedido foi realizado com sucesso. Nós enviamos um email para si com as suas credencias de acesso.');

        }, (error) => {

            if(error.response){
                if(error.response.data.code === 'ER_DUP_ENTRY'){
                    setMessageSnackBar('Você já fez o pedido para se tornar um produtor.');
                }else{
                    setMessageSnackBar('Ocorreu um erro! Por favor recarregue a página e tente novamente.');
                }
            }else{
                setMessageSnackBar('Estamos com problemas na conexão com o servidor.');
            }

            setIsBecomingClienteAutor(false);
            setSnackBarOpened(true);
        })*/

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
              <br/> 
              <Typography variant="body2" color='textSecondary' align='center'>
                  O Lubeasy é uma plataforma angolana de e-commerce de produtos digitais, na qual as pessoas colocam a venda os seus talentos, habilidades ou conhecimentos por meio de um formato digital, permitindo assim, a qualquer um que deseje aprender ou apreciar qualquer coisa possa fazê-lo através do seu smartphone ou computador.
              </Typography>
            </Grid>

            <Grid item xs={12} md={9} lg={6}>
                <br/> 
                <Link variant="subtitle1" color="secondary" href="https://lubeasy-website.herokuapp.com/termos" target="_blank" rel="noreferrer">
                    Termos e Condições De Utilização
                </Link>
            </Grid>

            <br/><br/>

            <Grid item xs={12} md={9} lg={6}>   
              <Typography variant="h6">Suporte:</Typography>
            </Grid>
            <br/>
            <CardPage disabledAction={true} />

        </Grid>
        <Typography align={'center'} style={{margin: 8}}>
            <Link variant="body2" color="primary" href={`${process.env.REACT_APP_FACILITADOR_APP_URL}`} target="_blank" rel="noreferrer">
                ACESSAR APLICATIVO WEB DO PRODUTOR
            </Link>
        </Typography>
        <PageSnackBar snackBarOpened={snackBarOpened} handleClose={() => setSnackBarOpened(false)} message={messageSnackBar}/>
    </>
  );
}
