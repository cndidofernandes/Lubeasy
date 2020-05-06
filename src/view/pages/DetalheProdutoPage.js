import React from 'react';
import { makeStyles, useTheme } from "@material-ui/styles";
import { Grid, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DialogForPayment from "../customComponents/Dialog/DialogForPayment";
import ErrComponent from "../customComponents/Err";
import { domain_api } from "../../utils/ApiConfig";

import {useParams} from 'react-router-dom'

import VisibilityIcon from '@material-ui/icons/Visibility';
import HeadsetIcon from '@material-ui/icons/Headset';

import axios from "axios";

import PHPdateTime from "./../../utils/PHPdateTime";
import RecommendedProdutosHorizontal from '../customComponents/RecommendedProdutosHorizontal';
import PictureStepper from '../customComponents/PictureStepper';
import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import grey from '@material-ui/core/colors/grey';

const useStyle = makeStyles( (theme) => ({
  flyer:{
    width: '100%',
    height: 380,
    [theme.breakpoints.up(400)]: {
      height: 420,
    },
    [theme.breakpoints.up(768)]: {
      height: 768,
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
  margin: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: 25,
    textTransform: 'none',
  },
  chip: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  gridMain: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: 32,
    },
  },
  titleRecommendItens: {
    marginLeft: 16,
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4, 0, 1, 0),
    },
  },
  recommendItens: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 32
    },
  },
}));

function MainContentProduto(props){
  const classes = useStyle();
  const [openDialogForPayment, setOpenDialogForPayment] = React.useState(false);

  const onCloseDialogForPayment = () => setOpenDialogForPayment(false);
  const matadados = props.data.metadados.split(';');

  return (
    <Grid className={classes.gridMain} container direction={'column'}>

      <Grid container justify={'center'}>
        <Grid item xs={12} sm={5} md={4} xl={2}>
          <PictureStepper images={[
              {label: props.data.titulo, imgPath: props.data.capa},
              {label: props.data.titulo, imgPath: props.data.contracapa}]} />
        </Grid>

        <Grid item xs={12} sm={6} md={5} xl={3} style={{padding: 16}}>
          <Typography variant={'h6'} style={{fontWeight: 'bold', marginTop: 8}} children={props.data.titulo} />
          <Typography variant={'body2'} color={'textSecondary'} children={props.data.autor} />
          <Typography variant={'body2'} style={{marginTop: 16}} children={props.data.tipo+' • '+props.data.estilo} />

          <Typography variant="body2" style={{marginTop: 4}} align='justify' color={'textSecondary'}>{props.data.descricao}</Typography>

          <Box my={3} py={1} px={2}
               display="flex" flexDirection="column" alignItems="center"
               borderRadius={8} borderColor="grey.100" border={1}
               style={{marginBottom: 16}}>

            <div style={{display: 'flex', width: '100%'}}>
              <Typography style={{alignSelf: 'flex-start', flexGrow: 1}}
                          variant={'caption'}
                          color={'textSecondary'}
                          children={matadados[0]} />

              <Button style={{alignSelf: 'flex-end', padding: 0, textTransform: 'none'}}
                      href={`${props.data.previa}`} target='_blank'
                      disabled={!props.data.previa} variant='text'
                      startIcon={props.data.categoria !== 0 ? <VisibilityIcon /> : <HeadsetIcon />}
                      color={'secondary'}
                      size='small'
                      disableElevation>{props.data.categoria !== 0 ? 'Ver' : 'Ouvir'} uma amostra</Button>
            </div>

            <Typography variant={'h6'} style={{marginTop: 16, color: '#515149'}}><b>{props.data.preco} Kz</b></Typography>
            <Button style={{margin: 8, marginLeft: 24, marginRight: 24, marginBottom: 16}}
                    variant={'contained'}
                    color={'primary'}
                    size={'medium'}
                    disableElevation
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => setOpenDialogForPayment(true)}
                    children={'Comprar '+props.data.tipo}/>
          </Box>

          <Box>
            {props.data.tags.split(' ').map( (value, index) => (<Chip key={index} className={classes.chip} label={value} />))}
          </Box>

        </Grid>
      </Grid>

      <Grid container justify={'center'}>
        <Grid item xs={12} sm={11} md={9} xl={5}>

          <Typography className={classes.titleRecommendItens} variant="subtitle1" children={'Também podes gostar de'}/>
          <RecommendedProdutosHorizontal style={classes.recommendItens}
                                         by='estilo'
                                         data={props.data.estilo}
                                         uuidProduto={props.data.uuid}/>

        </Grid>
      </Grid>

      <Grid xs={12} lg={10} item style={{background: '#fff'}}>
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
    <div style={{flex: 'display', background: '#fff'}}>
        <AppBarWithBackButton titulo={networkObj.data ? networkObj.data.titulo :'Buscando...'}/>
        {getDynamicContent()}
    </div>
  );
}
