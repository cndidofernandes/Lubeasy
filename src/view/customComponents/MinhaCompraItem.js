import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";


import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";


import PHPdateTime from "./../../utils/PHPdateTime";

import MusicNoteIcon from "@material-ui/icons/MusicNote";
import VideocamIcon from "@material-ui/icons/Videocam";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import BookIcon from "@material-ui/icons/Book";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    MyAvatar: {
        backgroundColor: theme.palette.primary.main,
    },bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    listItem: {
        marginBottom: 1,
        background: theme.palette.background.paper
    },
    iconAvatar: {
        color: theme.palette.background.paper
    }
}));

const formatoProduto = {
    CURSO_ONLINE: 0,
    AUDIO: 1,
    WEBNARIO: 2,
    EBOOK: 3,
    FICHEIRO: 4,
    SERVICO_POR_ASSINATURA: 5,
}


export default function MinhaCompraItem(props) {
    const classes = useStyles();
    let AvatarIcon;
    const colorButtonDownload = props.isPay || props.preco === 0 ? '#81c784' : '#e53935';

    const history = useHistory();

    switch (props.formato) {

        case formatoProduto.AUDIO:
            AvatarIcon =  (<MusicNoteIcon style={{color: '#fff',margin: 9}} />);
            break;

        case formatoProduto.CURSO_ONLINE:
            AvatarIcon = (<VideocamIcon style={{color: '#fff',margin: 9}} />);
            break;

        case formatoProduto.WEBNARIO:
            AvatarIcon = (<VideocamIcon style={{color: '#fff',margin: 9}} />);
            break;

        case formatoProduto.FICHEIRO:
            AvatarIcon = (<InsertDriveFileIcon style={{color: '#fff',margin: 9}} />);
            break;

        case formatoProduto.SERVICO_POR_ASSINATURA:
            AvatarIcon = (<SubscriptionsIcon style={{color: '#fff',margin: 9}} />);
            break;

        case formatoProduto.EBOOK:
            AvatarIcon = (<BookIcon style={{color: '#fff',margin: 9}} />);
            break;

        default:
            AvatarIcon = (<ErrorOutlineIcon style={{color: '#fff',margin: 9}} />);
            break;
    }

    const handleDownloadClick = (e) => {

        if(props.isPay){

            if ( props.formato  === formatoProduto.SERVICO_POR_ASSINATURA )
                history.push(`/subscricao/${props.idProdutoDigital}/${props.titulo}`);
            else
                history.push(`/produto-comprado/${props.idCompra}/produto/${props.idProdutoDigital}`);

        }else{

            //Produto gratuito
            if(props.preco === 0){
                if ( props.formato  === formatoProduto.SERVICO_POR_ASSINATURA )
                    history.push(`/subscricao/${props.idProdutoDigital}/${props.titulo}`);
                else
                    history.push(`/produto-comprado/${props.idCompra}/produto/${props.idProdutoDigital}`);
            }else{
                props.handlePorPagarDrawer({
                    priceToPay: props.preco,
                    hashTagDownload: props.idCompra
                });
            }
            
        }

    };

    return (
        <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar className={classes.MyAvatar}>
                            {AvatarIcon}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={
                        <Typography variant={'subtitle2'} style={{fontWeight:'bold'}} children={props.titulo} />
                    }
                                  secondary={
                                      <>
                                          <Typography variant='body2' color='textSecondary'>
                                            {props.autor}
                                          </Typography>

                                          <Typography variant={'caption'} color={'primary'} >
                                            {PHPdateTime('d m Y', props.dataDaCompra)} • {<b>Por {props.preco+' Kz'}</b>}
                                          </Typography>
                                    </>
                                  }
                    />

                    <ListItemSecondaryAction>
                        <Tooltip TransitionComponent={Zoom}
                                 title={ (props.formato === formatoProduto.SERVICO_POR_ASSINATURA) ? "Ver subscrição" : 'Ver produto comprado' }>
                            <IconButton onClick={handleDownloadClick} edge="end" aria-label="icon">
                                <OpenInBrowserIcon style={{color: colorButtonDownload}}/>
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>

                </ListItem>
    );
}


MinhaCompraItem.propTypes = {
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    formato: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    dataDaCompra: PropTypes.string.isRequired
}

MinhaCompraItem.defaultProps = {
    titulo: 'Desconhecido',
    autor: 'Desconhecido',
    formato: 'e-Book',
    preco: 199,
    dataDaCompra: '02/02/2020'
}