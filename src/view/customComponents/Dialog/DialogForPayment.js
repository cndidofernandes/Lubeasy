import React from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


import Slide from '@material-ui/core/Slide';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import Radio from '@material-ui/core/Radio';

import { domain_api } from "../../../utils/ApiConfig";


import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DisablableButton from "../DisablableButton";



import { Auth0 } from '../../../utils/Auth-spa';
import DrawerBottomPaymentInfo from '../Drawer/DrawerBottomPaymentInfo';
import { Paper, Box } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    appBar: {
        background:theme.palette.background.paper,
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color:'black'
    },
    espaco:{
        margin: theme.spacing(2)
    }
}));

function ProdutoOrderItem({categoria, titulo, autor, preco }) {

    const getIconOfEstiloByCategoria = (categoria) => {

        switch (categoria) {
        
          //Music
          case 0: 
            return (<MusicNoteIcon style={{color: '#fff',margin: 9}} />);
          //Video
          case 1:
            return (<VideocamIcon style={{color: '#fff',margin: 9}} />);
          //Image
          case 2:
            return (<ImageIcon style={{color: '#fff',margin: 9}} />);
          //Docs
          case 3:  
            return (<DescriptionIcon style={{color: '#fff',margin: 9}} />);
          default:         
            return (<ErrorOutlineIcon style={{color: '#fff',margin: 9}} />);
          
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', marginTop: 8,marginBottom: 8}} >
            <Box m={1} display="flex" alignItems="center" justifyContent="center" bgcolor='secondary.main' borderRadius='50%'>
                {getIconOfEstiloByCategoria(categoria)}
            </Box>
            <div style={{width: '75%', whiteSpace: 'nowrap', flexGrow: 1}}>
                <Box fontSize="subtitle1.fontSize" textOverflow="ellipsis" overflow="hidden">
                  {titulo}
                </Box>
                <Box fontSize="body2.fontSize" my={0.2} textOverflow="ellipsis" overflow="hidden" color='text.secondary'>
                  {autor}
                </Box>
            </div>
            <Box fontSize='body2.fontSize' textAlign="center" mx={1.5}> <b>{preco}</b> Akz</Box>
        </div>
    );
}

function getSteps() {
    return ['Confirmação da compra', 'Forma de pagamento'];
}

function GetStepContent({step, formPaymentValue, handleChange, onClickFormPay, isLoading, produtoOrder}) {
    const classes = useStyles();

    switch (step) {
        case 0:
            return (<ProdutoOrderItem {...produtoOrder}  />);
        case 1:
            return (
                <div>
                    <RadioGroup aria-label="forma_pagamento" name="forma_pagamento" value={formPaymentValue} onChange={handleChange}>
                        <FormControlLabel value="Transferência Bancária" control={<Radio />} label="Transferência Bancária" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="Kamba" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="Code" />
                    </RadioGroup>
                    <DisablableButton disabled={isLoading} 
                                      onClick={onClickFormPay}
                                      variant='contained' 
                                      className={classes.espaco} 
                                      color='secondary' 
                                      disableElevation 
                                      children='Fazer pedido de compra' />
                </div>
            );
        default:
            return (<Typography component={'span'}>Um erro ocorreu! Recarregue a página</Typography>)
    }
}

function VerticalLinearStepper({produtoOrder}) {
    const classes = useStyles();
    console.log(produtoOrder);
    

    const [networkObj, setNetworkObj] = React.useState({
        isLoading: false,
        data: null,
        err: null
    });

    const [activeStep, setActiveStep] = React.useState(0);
    
    const [formPaymentValue, setFormPaymentValue] = React.useState('Transferência Bancária');
    
    const steps = getSteps();
    

    const handleChange = event => {
        setFormPaymentValue(event.target.value)    
        
    };

    const savePaymentInApi = (accessToken) => {
        axios({
            baseURL: domain_api,
            url: '/download',
            method: 'post',
            data: {
                idProdutoDigital: produtoOrder.idProduto,
                formaDePagamento: formPaymentValue
            },
            headers: {Authorization: 'Bearer '+accessToken}
          })
          .then(function (response) {
              if(response.status === 201){
                setActiveStep(2);
                setNetworkObj({isLoading: false, data: response.data, err: null});
              } 
              
          })
          .catch(function (error) {
              setNetworkObj({...networkObj, isLoading: false, err: error});
          });
    }

    const onClickFormPay = (event) => {
        setNetworkObj({...networkObj, isLoading: true, err: null});

        Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {
              savePaymentInApi(accessToken);
            }).catch(function (error) {
                setNetworkObj({...networkObj, isLoading: false, err: {request: {}}});
            });
        }).catch(function (error) {
            setNetworkObj({...networkObj, isLoading: false, err: {request: {}}});
        });;
        
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <GetStepContent 
                                step={index}
                                formPaymentValue={formPaymentValue}
                                handleChange={handleChange}
                                onClickFormPay={onClickFormPay}
                                produtoOrder={produtoOrder}
                                isLoading={networkObj.isLoading} />

                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button disabled={activeStep === 0 || networkObj.isLoading} onClick={handleBack} className={classes.button}>Voltar</Button>
                                    {activeStep === steps.length - 1 ? '' : ( <Button variant="contained" color='secondary' onClick={handleNext} className={classes.button} disableElevation>Seguinte</Button>)}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/*activeStep === steps.length && ( 
                    <>
                        <Button onClick={handleReset} className={classes.button}>
                            Comprar +1 ingresso
                        </Button>
                    </>)
            */}
            {(activeStep === steps.length || networkObj.err != null) && ( 
                    <>
                        <DrawerBottomPaymentInfo errInfo={networkObj.err} open={true} priceToPay={produtoOrder.preco} />
                    </>)
            }
            
        </div>
    );
}


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogPayment({open, handleClose, produtoOrder}) {
    const classes = useStyles();
    
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar position={"relative"} style={{background: '#FFFFFF', boxShadow:'none'}}>
                    <Toolbar>
                        <IconButton edge="start" style={{color: 'black'}} onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Pedido de compra
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container justify={'center'}>
                    <Grid item xs sm={6}>
                        <VerticalLinearStepper produtoOrder={produtoOrder} />
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}

//index === 1 ? label+' ('+qtd+')' : label COMPRAR