import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GetAppIcon from "@material-ui/icons/GetApp";
import Typography from "@material-ui/core/Typography";

import DescriptionIcon from '@material-ui/icons/Description';
import TheatersIcon from '@material-ui/icons/Theaters';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import {Auth0} from "../../utils/Auth-spa";

import PHPdateTime from "./../../utils/PHPdateTime";

import { domain_api } from "../../utils/ApiConfig";
import axios from "axios";
import { Button } from '@material-ui/core';


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


export default function MinhaCompraItem(props) {
    const classes = useStyles();
    let AvatarIcon;
    const colorButtonDownload = props.isPay ? '#81c784' : '#e53935';

    switch (props.categoria) {
    
        //Music
        case 0: 
            AvatarIcon = (<AudiotrackIcon className={classes.iconAvatar}/>);
            break;
    
        //Video
        case 1:
            AvatarIcon = (<TheatersIcon className={classes.iconAvatar}/>);
            break;
        
        //Image
        case 2:
            AvatarIcon = (<ImageIcon className={classes.iconAvatar}/>);
            break;
    
        //Docs
        case 3:  
            AvatarIcon = (<DescriptionIcon className={classes.iconAvatar}/>);
            break;
      
        default:         
            AvatarIcon = (<ErrorOutlineIcon className={classes.iconAvatar}/>);
            break;
        
    }

    const handleDownloadClick = () => {

        if(props.isPay){
            props.handleOpenBackDropDownload();

            axios({
                baseURL: domain_api,
                url: `/download/${props.id}/produto/${props.titulo}/token`,
                method: 'get',
                headers: {Authorization: 'Bearer '+props.accessToken},
            })
            .then(function (response) {
                
                const link = document.createElement('a');
                link.href = `${domain_api}download/${response.data.jwt}`;
                //link.setAttribute('download', 'file.'+response.headers['content-type'].split('/')[1]);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                setTimeout(() => {
                    props.handleCloseBackDropDownload();
                }, 3000);
                
            })
            .catch(function (error) {
                console.log('failure');
            });

        }else{
            props.handlePorPagarDrawer({
                priceToPay: props.preco,
                hashTagDownload: props.id
            });
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
                        <Tooltip TransitionComponent={Zoom} title="Baixar ficheiro">
                            <IconButton onClick={handleDownloadClick} edge="end" aria-label="baixar">
                                <GetAppIcon style={{color: colorButtonDownload}}/>
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
    );
}


MinhaCompraItem.propTypes = {
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    categoria: PropTypes.number.isRequired,
    preco: PropTypes.number.isRequired,
    dataDaCompra: PropTypes.string.isRequired
}

MinhaCompraItem.defaultProps = {
    titulo: 'Desconhecido',
    autor: 'Desconhecido',
    categoria: 0,
    preco: 199,
    dataDaCompra: '02/02/2020'
}