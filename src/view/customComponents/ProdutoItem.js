import React from 'react';
import PropTypes from 'prop-types';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

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
    margin: theme.spacing(0.5, 0.5, 1.6, 0.5)
  },
  cover: {
    height: 194,
    [theme.breakpoints.up('lg')]: {
      height: 234,
    },
    [theme.breakpoints.up('xl')]: {
      height: 284,
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 1, 1, 1)
  },
  bannerPromotion: {
    background: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0, 0.8, 0, 0.8),
    marginBottom: 4,
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
        return (<MusicNoteIcon />);
  
      //Video
      case 1:
        return (<VideocamIcon />);
      
      //Image
      case 2:
        return (<ImageIcon />);
  
      //Docs
      case 3:  
        return (<DescriptionIcon />);
    
      default:         
        return (<ErrorOutlineIcon />);
      
    }
  }

  const onClickProdutoItem = (e) => {
    history.push('/produto/'+props.uuid);
  }

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardActionArea onClick={onClickProdutoItem}>
          <CardMedia className={classes.cover} image={props.imagemProduto} title={props.nomeProduto} />
          <div className={classes.cardContent}>
            <Chip style={{alignSelf: 'flex-end', marginBottom: 2}}
                  size="small" label={props.tipoProduto}
                  color={'primary'}
                  icon={getIconOfEstiloByCategoria(props.categoriaProduto)} />
            <Typography noWrap variant='subtitle1'><b>{props.nomeProduto}</b></Typography>
            <Typography variant="body2" noWrap color="textSecondary">{props.autorProduto}</Typography>
            <Typography variant="caption" color="secondary"><b>{props.precoProduto} Kz</b></Typography>
          </div>
        </CardActionArea>
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