import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextFieldCustom from '../customComponents/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import blueGrey from '@material-ui/core/colors/blueGrey';
import appLogotipo from '../../assets/logo.png';
import DisablableButton from "../customComponents/DisablableButton";
import LinkCustom from "../customComponents/LinkCustom";
import PageSnackBar from "../customComponents/PageSnackBar";

import { login, loginAutor } from '../../services/Cliente';
import { getErrorResponse } from '../../utils/HandlerErrorResponse';

import { useDispatch } from 'react-redux';
import { callIsAuthentication } from "../../redux/actions/AuthThunkAction";
import { Typography, Collapse } from '@material-ui/core';

import {ExpandLess, ExpandMore} from "@material-ui/icons";

/*const CircularLogo = withStyles(theme => ({
    root: {
        width: 100,
        height: 100
    },
}))(Avatar);*/

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    searchBar:{
        borderRadius:'borderRadius',
        background: blueGrey[50],
        minWidth:200,
        padding: '0px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flexGrow: 1,
        marginLeft: theme.spacing(1)
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        flexBasis: 200,
      },
      
}));
  
export default function LoginPage(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [formSubmiting, setFormSubmiting] = React.useState(false);

    const [snackBarOpened, setSnackBarOpened] = React.useState(false);

    const [values, setValues] = useState({
        password: '',
        email: '',
        err: '',
        showPassword: false,
    });

    const handleSnackBarErrClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpened(false);
    };

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleBtSignIn = e => {
        
        e.preventDefault();
        setFormSubmiting(true);

        if(!values.email || !values.password){
            values.err = 'Preencha os campos!';
            setSnackBarOpened(true);
            setFormSubmiting(false);
            return
        }

        login(values.email, values.password, function (response, error) {
            
            if(!error){
                dispatch(callIsAuthentication());
            }else{
                setFormSubmiting(false);
                setSnackBarOpened(true);

                setValues({...values, err: getErrorResponse(error)});
            }

        })

    }

    return (
        <>
            <Toolbar/>
            <Toolbar/>


            <Grid container justify='center' alignItems='center' direction={'column'}>

                <Grid item xs={12} style={{padding: 16, paddingBottom: 24}}>
                    <Box style={{marginBottom: 12}} display="flex" justifyContent={'center'}>
                        <img src={appLogotipo} width={77} height={86} alt={'logo-app'} />
                    </Box>

                    <Typography style={{marginBottom: 18}} variant='subtitle2' color='textSecondary' align='center'>Por favor, faça primeiro o seu login:</Typography>

                    <form autoComplete="off" onSubmit={handleBtSignIn}>
                        <TextFieldCustom
                            icon={<AccountCircle />}
                            propsBox={{my:3}}
                            propsInputBase={{disabled: formSubmiting, placeholder: 'Email', type: 'email', required: true, onChange: handleChange('email')}} />

                        <Box my={3} className={classes.searchBar} borderRadius={100}>
                            <IconButton>
                                <LockIcon />
                            </IconButton>
                            <InputBase disabled={formSubmiting} className={classes.input} placeholder={'Senha'}
                            id="adornment-password"
                            required={true}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton disabled={formSubmiting}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility color='secondary' /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }/>
                        </Box>
                        <Grid container justify='center' alignItems='center'>
                            <Box mx={'auto'} textAlign='center'>
                                <DisablableButton disabled={formSubmiting} color='primary' type='submit' variant={'contained'} style={{boxShadow: 'none', minWidth: 300}}>Entrar</DisablableButton>
                                
                                {/*<Link style={{padding: 8}} variant="body2" color="textSecondary" href="/forget-password">
                                    Esqueci-me da minha senha
                                </Link>*/}
                                <br/>
                                <LinkCustom disabled={formSubmiting} path='../signup' text='Ainda não tenho uma conta'/>
                            </Box>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <PageSnackBar snackBarOpened={snackBarOpened} handleClose={handleSnackBarErrClose} message={values.err}/>
        </>
    );
}