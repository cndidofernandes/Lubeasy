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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import BookIcon from '@material-ui/icons/Book';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';


import { useHistory } from "react-router-dom";

import DialogForPayment from "../customComponents/Dialog/DialogForPayment";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(0.8, 0.6, 1.3, 0.6)
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

const formatoProduto = {
  CURSO_ONLINE: 3,
  AUDIO: 0,
  WEBNARIO: 2,
  EBOOK: 1,
  FICHEIRO: 4,
  SERVICO_POR_ASSINATURA: 5,
}

export default function ProdutoItem(props) {
  const classes = useStyles();
  const history = useHistory();

  const [openDialogPayment, setOpenDialogPayment] = React.useState(false);

  const onCloseDialogPayment = () => setOpenDialogPayment(false);

  const onClickProdutoItem = (e) => {
    history.push('/produto/'+props.uuid);
  }

  const getIconOfEstiloByFormato = (formato) => {

    switch (formato) {

      case formatoProduto.AUDIO:
        return (<MusicNoteIcon style={{color: '#fff'}} />);

      case formatoProduto.CURSO_ONLINE:
        return (<VideocamIcon style={{color: '#fff'}} />);

      case formatoProduto.WEBNARIO:
          return (<VideocamIcon style={{color: '#fff'}} />);

      case formatoProduto.FICHEIRO:
        return (<InsertDriveFileIcon style={{color: '#fff'}} />);

      case formatoProduto.SERVICO_POR_ASSINATURA:
          return (<SubscriptionsIcon style={{color: '#fff'}} />);

      case formatoProduto.EBOOK:
        return (<BookIcon style={{color: '#fff'}} />);

      default:         
        return (<ErrorOutlineIcon style={{color: '#fff'}} />);
      
    }
}

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardActionArea onClick={onClickProdutoItem}>
          <CardMedia className={classes.cover} image={props.imagemProduto} title={props.nomeProduto} component={'img'}/>
          <div className={classes.cardContent}>
            <Chip style={{alignSelf: 'flex-end', marginBottom: 2}}
                  icon={getIconOfEstiloByFormato(props.formatoProduto)}
                  size="small" label={props.tipoProduto}
                  color={'primary'} />
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