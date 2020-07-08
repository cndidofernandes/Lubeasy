import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TextFieldCustom from '../customComponents/TextField';

import blueGrey from '@material-ui/core/colors/blueGrey';

import DisablableButton from "../customComponents/DisablableButton";
import LinkCustom from "../customComponents/LinkCustom";
import PageSnackBar from "../customComponents/PageSnackBar";


import { createUser } from '../../services/Cliente';
import { getErrorResponse } from '../../utils/HandlerErrorResponse';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    titleAppBar: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    content: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
    },
    paper: {
        width: '40%',
        [theme.breakpoints.down('md')]: {
            width: '60%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        display: 'flex',
        flexDirection: "column",
        padding: theme.spacing(3),
        paddingTop: 20,
        paddingBottom: 0,
        marginTop: theme.spacing(2),
    },
    textField: {
        width: '100%'
    },
    button: {
        boxShadow: 'none',
    },
    typography: {
        margin: theme.spacing(3,3,1,3),
        color: theme.palette.text.secondary,
    },
    searchBar:{
        borderRadius:'borderRadius',
        background: blueGrey[50],
        minWidth:200,
        flexGrow: 1,
        marginBottom: 20,
        padding: '0px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flexGrow: 1,
        marginLeft: theme.spacing(1)
    },
    link: {
        color: '#515149'
    }
}));

export default function SignUpPage(props) {
    const classes = useStyles();
    const [formSubmiting, setFormSubmiting] = React.useState(false);
    const [snackBarOpened, setSnackBarOpened] = React.useState(false);

    const handleSnackBarErrClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpened(false);
    };

    const [values, setValues] = React.useState({
        name: '',
        user_name: '',
        email: '',
        phone: '',
        password: '',
        err: null,
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const criarConta = e => {
        e.preventDefault();
        setFormSubmiting(true);

        if(!values.name || !values.user_name || !values.email || !values.password || !values.phone){
            values.err = 'Preencha os campos!';
            setSnackBarOpened(true);
            setFormSubmiting(false);
            return
        }

        const user = {
            name: values.name,
            username: values.user_name,
            email: values.email,
            senha: values.password,
            telefone: values.phone 
        };

        createUser(user, function (response, error) {
            
            if(!error){

                props.history.replace('/accountcreated?email='+user.email);

            }else{
                setFormSubmiting(false);
                setSnackBarOpened(true);
                setValues({...values, err: getErrorResponse(error)});
            }

        })

    };

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Paper className={classes.paper} style={{marginTop: 0, display: 'flex', flexDirection: "row",padding: 0, alignItems: 'stretch'}} elevation={0}>
                    <Box className={classes.titleAppBar} fontSize="h6.fontSize">Criar conta no Lubeasy</Box>
                </Paper>
                <Paper className={classes.paper} elevation={0}>
                    <form autoComplete="off" onSubmit={criarConta}>
                        <TextFieldCustom disabled={formSubmiting} icon={<PersonIcon />} propsInputBase={{type: 'text', required: true, placeholder: 'Primerio e último nome', onChange: handleChange('name'), inputProps: {minlength: 6, maxlength: 35, pattern: '^[a-zA-ZáàâãéèêẽíìîĩóòõôúùũûçÁÀÂÃÉÈÊẼÍÌĨÎÓÒÕÔÚÙŨÔÇ]+(?:[ ]+[a-zA-ZáàâãéèêẽíìîĩóòõôúùũûçÁÀÂÃÉÈÊẼÍÌĨÎÓÒÕÔÚÙŨÔÇ]+)*$', title: 'O primeiro e último nome não pode ter números nem caracteres especiais(Ex: $%&#@=+...).'} }} />
                        <TextFieldCustom disabled={formSubmiting} icon={<PersonIcon />} propsInputBase={{type: 'text', required: true, placeholder: 'Nome de usúario', onChange: handleChange('user_name'), inputProps: {minlength: 2, maxlength: 20, pattern: '^[a-z0-9._]*$', title: 'O nome de usuário não pode ter caracteres maiúsculos, espaços nem pontuação (exepto: _ e .).'}}} />
                        <TextFieldCustom disabled={formSubmiting} icon={<EmailIcon />} propsInputBase={{type: 'email', required: true, placeholder: 'Email', onChange: handleChange('email')}} />
                        <TextFieldCustom disabled={formSubmiting} icon={<PhoneIcon />} propsInputBase={{type: 'tel',  required: true, placeholder: 'Número de telefone', onChange: handleChange('phone'), inputProps: {pattern: '[0-9]{3}[0-9]{3}[0-9]{3}'}, startAdornment: (<InputAdornment position="start">+244</InputAdornment>)}} />
                        <Box className={classes.searchBar} borderRadius={100}>
                            <IconButton disabled={formSubmiting}>
                                <LockIcon />
                            </IconButton>
                            <InputBase disabled={formSubmiting} className={classes.input} placeholder={'Senha'}
                                id="adornment-password"
                                required={true}
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                inputProps={{minlength: 8, maxlength: 50}}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                            {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment> }/>
                        </Box>
                        <Grid container justify='center'>
                            <Grid item>
                                <DisablableButton color='primary' type='submit' className={classes.button} disabled={formSubmiting} variant="contained">Criar Conta</DisablableButton>
                            </Grid>
                        </Grid>
                    </form>

                    <Box className={classes.typography} textAlign="center" variant='body2' >Ao clicar em criar conta, você concorda com nossos {<b><LinkCustom disabled={formSubmiting} path={'https://lubeasy-website.herokuapp.com/termos'} text="Termos e Condições De Utilização." /></b>}</Box>
                </Paper>
                <Paper className={classes.paper} elevation={0}>
                    <Box className={classes.typography} textAlign="center">Já tem uma conta? <LinkCustom disabled={formSubmiting} path='/login' text={<p className={classes.link}>Faça o login</p>}/> </Box>
                </Paper>
                <PageSnackBar snackBarOpened={snackBarOpened} handleClose={handleSnackBarErrClose} message={values.err}/>
            </div>
        </div>
    );
}