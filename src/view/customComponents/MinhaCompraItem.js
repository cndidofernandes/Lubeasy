import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
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

import PHPdateTime from "./../../utils/PHPdateTime";



const useStyles = makeStyles(theme => ({
    MyAvatar: {
        backgroundColor: theme.palette.secondary.main,
    },bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    listItem: {
        marginBottom: 1,
        background: theme.palette.background.paper
    }
}));


export default function MinhaCompraItem(props) {
    const classes = useStyles();
    let AvatarIcon;
    const colorButtonDownload = props.isPay ? '#81c784' : '#e53935';
    
    const bull = <span className={classes.bullet}>•</span>;

    switch (props.categoria) {
    
        //Music
        case 0: 
            AvatarIcon = (<AudiotrackIcon color='background.paper' />);
            break;
    
        //Video
        case 1:
            AvatarIcon = (<TheatersIcon color='background.paper' />);
            break;
        
        //Image
        case 2:
            AvatarIcon = (<ImageIcon color='background.paper' />);
            break;
    
        //Docs
        case 3:  
            AvatarIcon = (<DescriptionIcon color='background.paper' />);
            break;
      
        default:         
            AvatarIcon = (<ErrorOutlineIcon color='background.paper' />);
            break;
        
    }

    const handleDownloadClick = () => {
        

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
                                          {props.autor} <br/>
                                          <Typography variant={'caption'} color={'secondary'} component={'span'} >
                                            {PHPdateTime('d m Y', props.dataDaCompra)} • {<b>Por {props.preco+' Kz'}</b>}

                                          </Typography>
                                          </>
                                  }
                    />
                    <ListItemSecondaryAction>
                        <Tooltip TransitionComponent={Zoom} title="Baixar ficheiro">
                            <IconButton onClick={props.onClick} edge="end" aria-label="baixar">
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
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    dataDaCompra: PropTypes.string.isRequired
}

MinhaCompraItem.defaultProps = {
    titulo: 'Desconhecido',
    autor: 'Desconhecido',
    categoria: 'Desconhecido',
    preco: 199,
    dataDaCompra: '02/02/2020'
}