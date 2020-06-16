import React from 'react';
import PropTypes from 'prop-types';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


import { useHistory } from "react-router-dom";

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

export default function ProdutoAssinadosItem(props) {
  const classes = useStyles();
  const history = useHistory();

  const onClickProdutoItem = (e) => {
    history.push(`/assinatura/${props.id}/${props.nomeProduto}`);
  }

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardActionArea onClick={onClickProdutoItem}>
          <CardMedia className={classes.cover} image={props.imagemProduto} title={props.nomeProduto} component={'img'}/>
          <div className={classes.cardContent}>
            {/*<Chip style={{alignSelf: 'flex-end', marginBottom: 2}}
                   size="small" label={props.tipoProduto}
                   color={'primary'}/>*/}
            <Typography noWrap variant='subtitle1'><b>{props.nomeProduto}</b></Typography>
            <Typography variant="body2" noWrap color="textSecondary">{props.autorProduto}</Typography>
            <Typography style={{marginTop: 4}} variant="caption" color="textSecondary">Termino da assinatura: {props.dataDePagamento}</Typography>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}

ProdutoAssinadosItem.propTypes = {
  imagemProduto: PropTypes.string.isRequired,  
  nomeProduto: PropTypes.string.isRequired,  
  autorProduto: PropTypes.string.isRequired,  
  tipoProduto: PropTypes.string.isRequired,  
  precoProduto: PropTypes.number.isRequired,
  categoriaProduto: PropTypes.number.isRequired 
}

ProdutoAssinadosItem.defaultProps = {
  imagemProduto: 'https://i.pinimg.com/originals/23/34/5a/23345a0edaeee4970432812c2c34d647.jpg',  
  nomeProduto: 'Nome do produto',  
  autorProduto: 'Autor',
  tipoProduto: 'Podcast',
  precoProduto: '199 Akz',
  categoriaProduto: 0
}