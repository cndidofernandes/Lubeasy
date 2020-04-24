import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";
import CardPage from './CardPage';

// import { Container } from './styles';

export default function AboudPage(props) {
  return (
    <>
        <AppBarWithBackButton titulo='Sobre'/>
        <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 16}}>
            <Grid item xs={12} md={9} lg={6}>
                <br/>   
                <Typography variant="h4">Lubeasy App</Typography>
            </Grid>

            <Grid item xs={12} md={9} lg={6}>  
              <br/> 
              <Typography variant="subtitle2">Versão 0.0.1</Typography>
            </Grid>

            <Grid item xs={12} md={9} lg={6}>   
              <Typography variant="subtitle1" onClick={() => props.history.push('/website/termos')} color='primary'>Termos e Condições De Utilização</Typography>
            </Grid>

            <br/><br/>

            <Grid item xs={12} md={9} lg={6}>   
              <Typography variant="h6">Suporte:</Typography>
            </Grid>
            <br/>
            <CardPage disabledAction={true} />

        </Grid>
    </>
  );
}