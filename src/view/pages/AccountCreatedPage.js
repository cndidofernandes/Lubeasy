import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';



export default function AccountCreatedPage(props) {
    
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
                      <Box p={2}>
                          <Typography align={'center'} gutterBottom>A sua conta foi criada com sucesso</Typography>
                          <Typography align={'center'} gutterBottom color={'textSecondary'}>
                              Consulte o seu email {<b>{props.email}</b>}, para activar a sua conta e comprares os ingressos dos seus eventos favoritos.
                          </Typography>
                      </Box>
                  </Grid>
              </Grid>
              <Grid container justify={'center'}>

                  <Grid item>

                      <Button onClick={ () => { props.history.replace('/'); }} variant="contained" color="primary" size="large" style={{boxShadow:'none'}}>Ir para o App</Button>
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
                              © Copyrights Lubventos. Todos os direitos reservados.
                              Desenhado por Lubeasy
                          </Typography>
                      </Box>
                  </Grid>

              </Grid>

    </>
  );
}