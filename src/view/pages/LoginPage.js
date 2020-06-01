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
import {Auth0} from "../../utils/Auth-spa";
import auth0Client from '../../utils/Auth-js';
import { parseQueryResult } from "../../utils/UtilAuth0";
import DisablableButton from "../customComponents/DisablableButton";
import LinkCustom from "../customComponents/LinkCustom";
import PageSnackBar from "../customComponents/PageSnackBar";
import { getErrDescriptionLoginInPT } from "../../utils/UtilErr";

import Cookies from 'universal-cookie';

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

    const createState = (nonce)  => {
        if (props.redirectUrl) {
            new Cookies().set('login_info', {[`${nonce}`]: {redirectUrl: props.redirectUrl} }, { path: '/' })
        }
    }

    const handleBtSignIn = e => {
        e.preventDefault();
        setFormSubmiting(true);

        if(!values.email || !values.password){
            values.err = 'Preencha os campos!';
            setSnackBarOpened(true);
            setFormSubmiting(false);
            return
        }

        Auth0().then((auth0) => {
            auth0.buildAuthorizeUrl().then((url) => {            
                const queryStringFragments = url.split('?').slice(1).join('');
                const {state, nonce} = parseQueryResult(queryStringFragments);    

                createState(state)

                auth0Client.signIn(values.email, values.password, {state: state, nonce: nonce}, (err) =>{
                    setFormSubmiting(false);
                    setSnackBarOpened(true);
                    setValues({...values, err: getErrDescriptionLoginInPT(err.error)});
                });

            });
        });

    }


    React.useEffect( () => {
        if( props.location.search === '?accountactivation=true'){
            setSnackBarOpened(true);
            setValues({ ...values, err: "Ophs, ao que parece a sua conta está desativada, por favor consulte o seu email para poder activar."});
        }
    }, [])

    return (
        <>
            <Toolbar/>
            <Toolbar/>


            <Grid container justify='center' alignItems='center' direction={'column'}>

                <Grid item xs={12} md={3} style={{padding: 16, paddingBottom: 24}}>
                    <Box style={{marginBottom: 32}} display="flex" justifyContent={'center'}>
                        <img src={appLogotipo} width={65} height={65} alt={'logo-app'} />
                    </Box>

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
                                <DisablableButton color='primary' disabled={formSubmiting} type="submit" variant={'contained'} style={{boxShadow: 'none', minWidth: 300}}>Entrar</DisablableButton>
                                <br/>
                                <LinkCustom disabled={formSubmiting} path='signup' text='Ainda não tenho uma conta'/>
                            </Box>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <PageSnackBar snackBarOpened={snackBarOpened} handleClose={handleSnackBarErrClose} message={values.err}/>
        </>
    );
}