import React from 'react';
import { makeStyles, useTheme } from "@material-ui/styles";
import { Grid, Typography, Button } from '@material-ui/core';
import TransparentAppBarWithBackButton from "../customComponents/TransparentAppBarWithBackButton";
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DialogForPayment from "../customComponents/Dialog/DialogForPayment";
import PropTypes from 'prop-types';
import ErrComponent from "../customComponents/Err";
import { domain_api } from "../../utils/ApiConfig";

import {useParams} from 'react-router-dom'

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import axios from "axios";

import PHPdateTime from "./../../utils/PHPdateTime";
import RecommendedProdutosHorizontal from '../customComponents/RecommendedProdutosHorizontal';



const useStyle = makeStyles( (theme) => ({
  flyer:{
    width: '100%',
    height: '20%',
    [theme.breakpoints.down('md')]: {
      height: '45%',
    },
  },
  priceBox: {
    flexGrow: 1,
    color: theme.palette.primary.contrastText, 
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.overline.fontSize,
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  contentDiv:{
    margin: theme.spacing(1)
  },
  buttonPay: {
    boxShadow: 'none',
    margin: theme.spacing(0,2,3,2)
  } ,
    rootStepper: {
        maxWidth: 400,
        flexGrow: 1,
    },
    headerStepper: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    imgStepper: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
    margin: {
        marginRight: theme.spacing(1),
    },
    fab: {
        position: 'fixed',
        bottom: 25,
    },
}));

function PictureStepper(props) {
    const classes = useStyle();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const tutorialSteps=[
        props.capa, props.contracapa
    ]
  
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Slide direction={'left'} in={true} mountOnEnter unmountOnExit>
              <img className={classes.flyer} src={tutorialSteps[activeStep]} alt={tutorialSteps[activeStep]} />
            </Slide>
            <MobileStepper 
                style={{backgroundColor:'white'}}
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                   <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                   </Button>
                }
               backButton={
                   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                   </Button>
               } />
        </div>
    );
}

function Header(props){
  //const bull = <span className={props.classes.bullet}>•</span>;

  return (
    <>
        <PictureStepper {...props}/>
        <div style={{margin: 16, marginTop: 8}}>
          
          <div style={{display: 'flex'}}>
            <Typography variant={'caption'} style={{alignSelf: 'flex-start',fontWeight: 'bold', flexGrow: 1, marginRight: 10}} color='secondary' children={props.tags} />
            <Typography variant={'body2'} style={{alignSelf: 'flex-end', fontWeight: 'bold'}} color='secondary' children={'Por '+props.preco+' Kz'} />
          </div>

          <Typography variant={'h6'} style={{fontWeight: 'bold'}} children={props.titulo} />
          <Typography variant={'body2'} color={'textSecondary'} children={props.autor} />
          <Typography variant={'body2'} style={{marginTop: 14}} children={props.tipo+' • '+props.estilo} />
          <Typography variant="body1" style={{marginTop: 4}} align='justify' color={'textSecondary'}>{props.descricao}</Typography>

          <Button href={`${props.previa}`} target='_blank' disabled={!props.previa} variant='contained' startIcon={<ArrowDownwardIcon />} style={{marginTop: 20}} color={'secondary'} size='small' disableElevation>Baixar uma amostra</Button>

          <Typography variant="body2" style={{marginTop: 20}} color={'textSecondary'}>Publicado em {PHPdateTime('d m Y', props.dataDePublicacao)}, por @Lubeasy</Typography>
        </div>
    </>
  )
}

function MainContentProduto(props){
  const classes = useStyle();
  const theme = useTheme();
  const [openDialogForPayment, setOpenDialogForPayment] = React.useState(false);
  

  const onCloseDialogForPayment = () => setOpenDialogForPayment(false);

  return (
    <Grid container direction="column" justify="center" alignItems="center" >

        <Grid item xs={12} sm={10} md={8} style={{background: '#fff', paddingBottom: 20}}>
          <Header classes={classes} theme={theme} {...props.data}  /> 
          <RecommendedProdutosHorizontal by='estilo' data={props.data.estilo} />
        </Grid>
        <Grid item xs={12} sm={10} md={8} style={{background: '#fff'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <DialogForPayment 
                open={openDialogForPayment} 
                handleClose={onCloseDialogForPayment}
                produtoOrder ={{
                  idProduto: props.data.id, 
                  uuidProduto: props.data.uuid,
                  titulo: props.data.titulo,
                  autor: props.data.autor,
                  categoria: props.data.categoria,
                  preco: props.data.preco,
                }}  />  
        </Grid>
        <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="buy" className={classes.fab}
            onClick={ () => setOpenDialogForPayment(true)} >
            <ShoppingCartIcon className={classes.margin} />
            Comprar
        </Fab>
    </Grid>
  );
}

export default function DetalheProdutoPage(props) {
  const uuidProdutoDigital = useParams().uuid;  

  const [networkObj, setNetworkObj] = React.useState({
    isLoading: true,
    data: null,
    err: null
  });

  const getProdutoFromApi = (idProduto) => {
    axios({
      baseURL: domain_api,
      url: '/produto/'+uuidProdutoDigital,
      method: 'get'
    })
    .then(function (response) {
      setNetworkObj({isLoading: false, data: response.data, err: null});
    })
    .catch(function (error) {
        setNetworkObj({...networkObj, isLoading: false, err: error});
    });
  }

  const getDynamicContent = () => {
    if (networkObj.isLoading) {
        return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
    }else if (networkObj.err) {
        return (<ErrComponent err={networkObj.err} />);
    } else {
        return (<MainContentProduto data={networkObj.data} uuidProdutoDigital={uuidProdutoDigital} location={props.location}/>);
    }
  }

  React.useEffect(function(){

    setNetworkObj({
      isLoading: true,
      data: null,
      err: null
    });
    getProdutoFromApi(uuidProdutoDigital);
    
  }, [props]);

  
  return (
    <div style={{position:'relative'}}>
      <TransparentAppBarWithBackButton />
      {getDynamicContent()}
    </div>
  );
}

Header.propTypes = {
  capa: PropTypes.string.isRequired,
  contracapa: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,  
  theme: PropTypes.any.isRequired,
  titulo: PropTypes.string.isRequired,
  estilo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
  precoVip: PropTypes.number,
}

Header.defaultProps = {
    capa: 'https://i.pinimg.com/originals/23/34/5a/23345a0edaeee4970432812c2c34d647.jpg',
    contracapa: 'https://previews.123rf.com/images/ninalisitsyna/ninalisitsyna2003/ninalisitsyna200300625/142381711-minimal-vector-coverage-cover-design-for-electronic-music-festival-abstract-sound-wave-cover-layout-.jpg',
    titulo: 'Caos (Mixtape)',
    autor: 'Desconhecido',
    tipo: 'Mixtape',
    preco: 190,
    precoPromocao: 120,
    descricao: 'O uso do StepButtonaqui demonstra rótulos de etapas clicáveis, além de definir o completed sinalizador. No entanto, como as etapas podem ser acessadas de maneira...',
    dataCriacao:'desconhecido',
    metadados:'lorem upson orealam grupom saldane melarousy eacet, lorem upson orealam grupom saldane melarousy eacet \n lorem upson orealam grupom saldane melarousy eacet',
    estilo:'Rap/Hip hop',
}
