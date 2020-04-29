import React from 'react';
import PropTypes from 'prop-types';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { useHistory } from "react-router-dom";
import { Box, Button } from '@material-ui/core';

import DialogForPayment from "../customComponents/Dialog/DialogForPayment";

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    margin: theme.spacing(0, 0, 0.5, 0),
    borderRadius: 0,
    width: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  cover: {
    width: 180,
    [theme.breakpoints.down(361)]: {
      width: 150
    },
    [theme.breakpoints.down(321)]: {
      width: 135
    },
    display: 'flex',
    alignItems: 'flex-end'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  bannerPromotion: {
    background: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0, 0.8, 0, 0.8),
    marginBottom: 4
  },
  iconSize: {
    height: 16,
    width: 16,
    marginRight: 2
  },
}));

export default function ProdutoItem(props) {
  const classes = useStyles();
  const history = useHistory();

  const [openDialogPayment, setOpenDialogPayment] = React.useState(false);

  const onCloseDialogPayment = () => setOpenDialogPayment(false);


  const getIconOfEstiloByCategoria = (categoria) => {

    switch (categoria) {
    
      //Music
      case 0: 
        return (<MusicNoteIcon className={classes.iconSize} color='secondary' />);
  
      //Video
      case 1:
        return (<VideocamIcon className={classes.iconSize} color='secondary' />);
      
      //Image
      case 2:
        return (<ImageIcon className={classes.iconSize} color='secondary' />);
  
      //Docs
      case 3:  
        return (<DescriptionIcon className={classes.iconSize} color='secondary' />);
    
      default:         
        return (<ErrorOutlineIcon className={classes.iconSize} color='secondary' />);
      
    }
  }
  

  const onClickProdutoItem = (e) => {
    history.push('/produto/'+props.uuid);
  }

  return (
    <>
    <Card className={classes.card} elevation={0}>
      <CardMedia className={classes.cover} image={props.imagemProduto} title={props.nomeProduto}></CardMedia>
      
        <div className={classes.details}>
            <CardContent>
              <div style={{width: 154, whiteSpace: 'nowrap'}}>
                <div className={classes.controls}>
                  {getIconOfEstiloByCategoria(props.categoriaProduto)}
                  <Typography style={{flexGrow: 1}} variant='overline'>{props.tipoProduto}</Typography>
                </div>
                              
                <Box fontSize="body2.fontSize" textOverflow="ellipsis" overflow="hidden" color='text.secondary'>
                  {props.autorProduto}
                </Box>
                <Box fontSize="subtitle1.fontSize" my={0.5} textOverflow="ellipsis" overflow="hidden">
                  {props.nomeProduto}
                </Box>
                <Typography variant="body2" color="secondary">{props.precoProduto} AKz</Typography>
              </div>
            </CardContent>

            <div className={classes.controls}>
                <Typography style={{flexGrow: 1}}/>
                <Button onClick={onClickProdutoItem} style={{marginBottom: 8, marginRight: 8}}  startIcon={<ArrowDownwardIcon />} size="small" variant="contained" color="secondary" disableElevation>Comprar</Button>
            </div>
        </div>
      
    </Card>
    <DialogForPayment 
                open={openDialogPayment} 
                handleClose={onCloseDialogPayment}
                produtoOrder ={{
                  idProduto: props.id, 
                  uuidProduto: props.uuid,
                  titulo: props.nomeProduto,
                  autor: props.autorProduto,
                  categoria: props.categoriaProduto,
                  preco: props.precoProduto,
                }} />
    </>
  );
}

ProdutoItem.propTypes = {  
  imagemProduto: PropTypes.string.isRequired,  
  nomeProduto: PropTypes.string.isRequired,  
  autorProduto: PropTypes.string.isRequired,  
  tipoProduto: PropTypes.string.isRequired,  
  precoProduto: PropTypes.number.isRequired,
  categoriaProduto: PropTypes.number.isRequired 
}  

ProdutoItem.defaultProps = {  
  imagemProduto: 'https://i.pinimg.com/originals/23/34/5a/23345a0edaeee4970432812c2c34d647.jpg',  
  nomeProduto: 'Nome do produto',  
  autorProduto: 'Autor',
  tipoProduto: 'Podcast',
  precoProduto: '199 Akz',
  categoriaProduto: 0
}