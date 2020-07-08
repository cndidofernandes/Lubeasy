import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Collapse } from '@material-ui/core';

import {ExpandLess, ExpandMore} from "@material-ui/icons";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';



export default function AccountCreatedPage(props) {

    const [expandButtonSignIn, setExpandButtonSignIn] = React.useState(false);
    
  return (
      <>
          <div style={{minHeight: '80vh'}}>
              <Grid container justify={'center'}>
                  <Grid item>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <Box textAlign={'center'} fontSize={80} color={'textSecondary'}>
                          <CheckCircleRoundedIcon style={{color: '#00e700'}} fontSize={'inherit'}/>
                      </Box>
                      <Box textAlign={'center'} fontSize={35} color={'textSecondary'} fontWeight="fontWeightLight">Parabéns</Box>
                      <Box p={6}>
                          <Typography align={'center'} gutterBottom>A sua conta no Lubeasy foi criada com sucesso</Typography>
                          <Typography align={'center'} gutterBottom color={'textSecondary'}>
                              Por favor, consulte o seu email, nós enviamos para si um email de confirmação para poder finalizar o seu cadastro. Obrigado.
                          </Typography>
                      </Box>
                  </Grid>
              </Grid>
              <Grid container justify={'center'}>

                  <Grid item>

                      <Button onClick={() => props.history.replace('/home')} variant="contained" color="primary" size="large" style={{boxShadow:'none'}}>Ir para o app</Button>

                      <br/>
                      <br/>
                  </Grid>
              </Grid>
          </div>
              <Grid container justify='center' alignItems='center'>
                  <Grid item>
                      <Divider variant={'middle'}/>
                      <Box p={2} py={4}>

                          <Typography align={'center'} color={'textSecondary'}>
                              © Copyright Lubeasy. Todos os direitos reservados.
                              Desenhado por Lubeasy
                          </Typography>
                      </Box>
                  </Grid>

              </Grid>

    </>
  );
}