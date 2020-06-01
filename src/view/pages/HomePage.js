import React from 'react';
import { useSelector } from 'react-redux';

import {Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import PropTypes from 'prop-types'; 

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import Cookies from "universal-cookie";

import ProdutoItem from "../customComponents/ProdutoItem";
import ErrComponent from "../customComponents/Err";
import DialogWithConfirmation from "../customComponents/Dialog/DialogWithConfirmation";

import { domain_api } from "../../utils/ApiConfig";
import {Auth0} from "../../utils/Auth-spa";
import grey from "@material-ui/core/colors/grey";

import AppLogoFull from '../../assets/full_logo.png'
import {removeAllCookieAppToLogout} from "../../utils/HandlerCookieUtil";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    userAvatar: {
        marginLeft: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    menu:{
        border: '1px solid #d3d4d5'
    }

}));

function AppBarHome(props) {
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [disabledDialogLogout, setDisabledDialogLogout] = React.useState(false);
    const [openDialogLogout, setOpenDialogLogout] = React.useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery(theme => theme.breakpoints.only('xs'));


    const handleClick2 = event => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setTimeout(function(){
            setAnchorEl2(null);
        }, 100);
    };

    const logout = () => {
        setDisabledDialogLogout(true);
        removeAllCookieAppToLogout(new Cookies());

        Auth0()
            .then( async function (auth0) {
                await auth0.logout()
                setDisabledDialogLogout(false);
                setOpenDialogLogout(false);
            })
            .catch(function (err) {
                setDisabledDialogLogout(true);
        })
    }

    const listenerMyTicketsClick = () => {
        props.history.push('/meusdownloads');
    }

    const listenerLogoutClick = () => {
        setOpenDialogLogout(true);
    }

    const listenerAboutClick = () => {
        props.history.push('/about');
    }

    return (
        <React.Fragment>
            <Grow in>
                <AppBar position={"static"}
                        style={{
                            boxShadow: 'none',
                            background: '#fff',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,
                            borderBottomColor: grey[100]}}>
                    <Toolbar>
                        <img src={AppLogoFull}
                             alt={'Lubeasy logo'}
                             style={{ height: 46, width: 146}}/>
                        <Typography style={{flexGrow: 1}} />

                        <Hidden implementation={'css'} xsDown>

                            <Box display={'flex'} alignItems={'center'} mx={'auto'}>
                                <Button
                                        variant='text' size={'small'}
                                        onClick={listenerMyTicketsClick}
                                        children={'Minhas compras'} />
                                <Button
                                        variant='text' size={'small'}
                                        onClick={listenerAboutClick}
                                        style={{marginRight: 16, marginLeft: 8}}
                                        children={'Sobre'} />

                                <Typography color={"textSecondary"} variant={'body2'} children={props.nameUser}/>
                                <Avatar className={classes.userAvatar}>{props.nameUser.charAt(0).toUpperCase()}</Avatar>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: anchorEl2,
                                    })}
                                    onClick={handleClick2} aria-expanded={anchorEl2}
                                    aria-label="show more" size={'small'}>
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Box>

                        </Hidden>

                        <Hidden implementation={'css'} smUp>
                            <IconButton edge={'end'} onClick={handleClick2} color='primary'>
                                <MoreVertRoundedIcon />
                            </IconButton>
                        </Hidden>
                        <Menu elevation={1} className={classes.menu} id="minha-conta" anchorEl={anchorEl2} keepMounted open={Boolean(anchorEl2)} onClose={handleClose2}>
                            <List component={'div'}>
                                {isMobile && (
                                <>
                                    <ListItem button divider>
                                        <ListItemAvatar color={'secondary'}>
                                            <Avatar color={'primary'}>{props.nameUser.charAt(0).toUpperCase()}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={props.nameUser} secondary={props.emailUser} />
                                    </ListItem>
                                    <ListItem button onClick={listenerMyTicketsClick}>
                                        <ListItemAvatar>
                                            <ShoppingBasketIcon />
                                        </ListItemAvatar>
                                        <ListItemText primary="Minhas compras" />
                                    </ListItem>
                                    <ListItem button onClick={listenerAboutClick}>
                                        <ListItemAvatar>
                                            <InfoIcon />
                                        </ListItemAvatar>
                                        <ListItemText primary="Sobre"/>
                                    </ListItem>
                                </>)}
                                <ListItem button onClick={listenerLogoutClick}>
                                    <ListItemAvatar>
                                        <ExitToAppIcon />
                                    </ListItemAvatar>
                                    <ListItemText primary="Sair da conta"/>
                                </ListItem>
                            </List>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Grow>

            <DialogWithConfirmation 
                            open={(openDialogLogout)} 
                            disabled={disabledDialogLogout}
                            handleClose={() => { setOpenDialogLogout(false); }} 
                            onSuccess={() => { logout(); }}
                            title={'Queres sair da tua conta?'}
                            contentText={'Ao sair da sua conta você deixará de fazer os downloads das suas músicas, livros, imagens, vídeos e muito mais...'}/>
        </React.Fragment>
    )
}

const renderProdutoItem = (value, idx) => {
    return ( <Grid key={value.id} item xs={6} sm={4} md={3} xl={2}>
                <ProdutoItem
                    id={value.id}
                    uuid={value.uuid}
                    imagemProduto={value.capa}
                    nomeProduto={value.titulo}
                    autorProduto={value.autor}
                    tipoProduto={value.tipo}
                    categoriaProduto={value.categoria}
                    precoProduto={value.preco} />
              </Grid>)
}

export default function HomePage(props) {
    const [produtoResponseApi, setProdutoResponseApi] = React.useState({
        hasMore: false,
        page: 0,
        pageSize: 7,
        listProduto: [],
        accessToken: null,
        err: null
    });

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const user = useSelector((stateApp) => {
        return stateApp.getUser;
    });
    

    const getProdutosFromApi = (accessToken) => {
        
        axios({
            baseURL: domain_api,
            url: '/produto',
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            params: {
                page: produtoResponseApi.page+1,
                pageSize: produtoResponseApi.pageSize
            },
            cancelToken: source.token,
        })
        .then(function (response) {
            setProdutoResponseApi({
                hasMore: response.data.hasMore,
                page: response.data.page,
                pageSize: response.data.pageSize,
                listProduto: [...produtoResponseApi.listProduto, ...response.data.listProduto],
                accessToken: accessToken
            });
        })
        .catch(function (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error);
                return;
            }
            setProdutoResponseApi({...produtoResponseApi, hasMore: false, err: error});
        });
    }

    const getDynamicContent = () => {
        if (produtoResponseApi.listProduto.length === 0 && !produtoResponseApi.err) {
            return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
        }else if (produtoResponseApi.err && produtoResponseApi.listProduto.length === 0) {
            return (<ErrComponent messageDefault='Ophs, ocorreu um erro ao carregar os produtos.' err={produtoResponseApi.err} />);
        } else {
            return (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={ () => getProdutosFromApi(produtoResponseApi.accessToken)}
                    hasMore={produtoResponseApi.hasMore}
                    loader={<CircularProgress size={18} style={{position:'absolute', left:'50%', marginLeft: -20, marginBottom: 20}}/>}>
                    {
                        <Grid container justify="flex-start" alignItems="flex-start" style={{marginTop: 8, marginBottom: 8, paddingLeft: 8, paddingRight: 8}}>
                            {produtoResponseApi.listProduto.map( (value, index) => renderProdutoItem(value, index) )}
                        </Grid>
                    }
                </InfiniteScroll>
            );
        }
    }

    React.useEffect(function(){

        Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {    
                getProdutosFromApi(accessToken);
            });
        }).catch(function (error) {
            setProdutoResponseApi({...produtoResponseApi, err: {request: 'É um erro do auth0'}});
        });

        return () => {
            source.cancel('Request Cancel');
        }
    }, []);    

    return (
        <>
            <AppBarHome title='Lubeasy' nameUser={user.name} emailUser={user.email} history={props.history} />
            {getDynamicContent()}
        </>
    );
}

AppBarHome.propTypes = {  
    nameUser: PropTypes.string.isRequired,  
    emailUser: PropTypes.string.isRequired,
}  

AppBarHome.defaultProps = {  
    nameUser: 'Desconhecido',  
    emailUser: 'Desconhecido'
}

