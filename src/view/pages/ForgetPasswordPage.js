import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import EmailIcon from '@material-ui/icons/Email';

import TextFieldCustom from '../customComponents/TextField';
import axios from 'axios';
import DisablableButton from '../customComponents/DisablableButton';
import PageSnackBar from '../customComponents/PageSnackBar';


export default function ForgetPasswordPage(props) {

    const [formSubmiting, setFormSubmiting] = React.useState(false);
    const [snackBarOpened, setSnackBarOpened] = React.useState(false);
    const [values, setValues] = React.useState({
        email: '',
        err: '',
    });


    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSendEmailForgetPassword = e => {
        e.preventDefault();
        setFormSubmiting(true);

        if(!values.email){
            values.err = 'Preencha o campo!';
            setSnackBarOpened(true);
            setFormSubmiting(false);
            return
        }

        axios({
            url: `https://${process.env.REACT_APP_AUTH_DOMAIN}/dbconnections/change_password`,
            method: 'post',
            data: {
                client_id: process.env.REACT_APP_AUTH_CLIENTE_ID,
                email: values.email,
                connection: 'Username-Password-Authentication'
            },
            cancelToken: source.token,
          })
          .then(function (response) {
              setValues({...values, err: 'Email de recuperação enviado com sucesso.'})
          })
          .catch(function (error) {

              if (axios.isCancel(error)) {
                  return;
              }
              setValues({...values, err: 'Ocorreu um erro ao enviar o email de recuperação. Por favor tente novamente.'});

              console.log(error.response)

        });

    }

    
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
                      <Box textAlign={'center'} fontSize={35} color={'textSecondary'} fontWeight="fontWeightLight">Esqueceu-se da sua senha?</Box>
                      <Box p={2}>
                          <Typography align={'center'} gutterBottom color={'textSecondary'}>
                              Coloque o seu email no campo abaixo, nós lhe enviaremos um email para poder redifinir uma nova senha:
                          </Typography>
                          <form autoComplete="off" onSubmit={handleSendEmailForgetPassword}>
                            <TextFieldCustom
                                icon={<EmailIcon color='primary' />}
                                propsBox={{my:3}}
                                propsInputBase={{disabled: formSubmiting, placeholder: 'Email', type: 'email', required: true, onChange: handleChange('email')}} />
                            <br/>
                            <DisablableButton color='primary' disabled={formSubmiting} type="submit" variant={'contained'} style={{boxShadow: 'none', minWidth: 300}}>Recuperar senha</DisablableButton>
                          </form>

                      </Box>
                  </Grid>
                  <PageSnackBar snackBarOpened={snackBarOpened} handleClose={() => setSnackBarOpened(false)} message={values.err}/>
              </Grid>
          </div>

    </>
  );
}