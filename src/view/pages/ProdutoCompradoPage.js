import React from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';

import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";
import DisablableButton from "../customComponents/DisablableButton";
import {becomeClienteAutor} from "../../services/Cliente";
import PageSnackBar from "../customComponents/PageSnackBar";

import { useSelector } from 'react-redux';
import DialogWithConfirmation from '../customComponents/Dialog/DialogWithConfirmation';
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {domain_api} from "../../utils/ApiConfig";
import ErrComponent from "../customComponents/Err";
import {useParams} from "react-router-dom";
import {Auth0} from "../../utils/Auth-spa";
import PHPdateTime from "../../utils/PHPdateTime";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 2, 0),
        minHeight: 568
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}));

export default function ProdutoCompradoPage(props) {
    const classes = useStyles();

    const {idCompra, idProduto} = useParams();

    const [produtoCompradoStateApi, setProdutoCompradoStateApi] = React.useState({
        isGettingProdutoComprado: true,
        produtoComprado: {},
        accessToken: null,
        err: null
    });

    const [snackBarOpened, setSnackBarOpened] = React.useState(false);
    const [messageSnackBar, setMessageSnackBar] = React.useState(null);
    const [openBackDropDownload, setOpenBackDropDownload] = React.useState(false);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const handleCloseBackDropDownload = () => {
        setOpenBackDropDownload(false)
    }

    const getProdutoComprado = (accessToken) => {

        axios({
            baseURL: domain_api,
            url: `/compra/${idCompra}/produto/${idProduto}/conteudo`,
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            cancelToken: source.token,
        })
            .then(function (response) {
                setProdutoCompradoStateApi({
                    isGettingProdutoComprado: false,
                    produtoComprado: response.data,
                    accessToken: accessToken,
                    err: null
                });
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error);
                    return;
                }

                setProdutoCompradoStateApi({
                    isGettingProdutoComprado: false,
                    produtoComprado: produtoCompradoStateApi.produtoComprado,
                    accessToken: accessToken,
                    err: error
                });

            });
    }

    const downloadConteudo = (conteudo) => {

        axios({
            baseURL: domain_api,
            url: `/compra/${idCompra}/produto/${idProduto}/conteudo/${conteudo.id}/token-download/${conteudo.titulo}`,
            method: 'get',
            headers: {Authorization: 'Bearer '+produtoCompradoStateApi.accessToken},
        }).then(function (response) {

            const link = document.createElement('a');
            link.href = `${domain_api}compra/produto/conteudo/${response.data.jwt}/download`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setTimeout(() => {
                handleCloseBackDropDownload();
            }, 1000);

        }).catch(function (error) {
            handleCloseBackDropDownload();
            setMessageSnackBar('Ophs, ocorreu um erro ao tentar baixar esse conteúdo');
            setSnackBarOpened(true);
        });

    };

    const openConteudo = (conteudo) => {

        axios({
            baseURL: domain_api,
            url: `/compra/${idCompra}/produto/${idProduto}/conteudo/${conteudo.id}/url`,
            method: 'get',
            headers: {Authorization: 'Bearer '+produtoCompradoStateApi.accessToken},
        }).then(function (response) {

            const link = document.createElement('a');
            link.href = `${response.data.link}`;
            link.target = '_blank';
            link.rel = 'noopener';
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setTimeout(() => {
                handleCloseBackDropDownload();
            }, 1000);

        }).catch(function (error) {
            handleCloseBackDropDownload();
            setMessageSnackBar('Ophs, ocorreu um erro ao tentar abrir esse conteúdo');
            setSnackBarOpened(true);
        });

    };

    const handleButtonDownloadClick = (conteudo) => (e) => {
        setOpenBackDropDownload(true)

        if(conteudo.isDownloadable){
            downloadConteudo(conteudo)
        }else{
            openConteudo(conteudo)
        }

    }


    React.useEffect(function(){

        Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {
                getProdutoComprado(accessToken);
            });
        }).catch(function (error) {
            setProdutoCompradoStateApi({
                isGettingProdutoComprado: false,
                produtoComprado: produtoCompradoStateApi.produtoComprado,
                err: {request: 'Ocorreu um erro, por favor, recarregue a página'}
            });
        });

        return () => {
            source.cancel('Request Cancel');
        }
    }, []);

    return (
    <>
        <AppBarWithBackButton titulo='Produto Comprado'/>
        {(!produtoCompradoStateApi.isGettingProdutoComprado && produtoCompradoStateApi.err === null) && 
        <Grid container justify="center">
            <Grid className={classes.root} item xs={12} sm={10} md={8}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Box display={'flex'} alignItems="center">
                        <Box mx={2}>
                            <img height={150} width={150}
                                 src={produtoCompradoStateApi.produtoComprado.capa}
                                 alt={produtoCompradoStateApi.produtoComprado.titulo}/>
                        </Box>
                        <Box style={{marginRight: 16}}>
                            <Typography variant={'body1'}><b>{produtoCompradoStateApi.produtoComprado.titulo}</b></Typography>
                            <Typography variant={'body2'} color={'primary'}>{produtoCompradoStateApi.produtoComprado.autor}</Typography>
                            <Typography variant={'body2'} color={'textSecondary'}>{produtoCompradoStateApi.produtoComprado.tipo} • {PHPdateTime('Y', produtoCompradoStateApi.produtoComprado.dataDePublicacao)}</Typography>
                        </Box>
                    </Box>

                    <List style={{marginTop: 8}}>
                        {produtoCompradoStateApi.produtoComprado.listConteudo.map( (value, key) => (

                            <>
                                <ListItem dense button key={key}>
                                    <ListItemAvatar>
                                        <Avatar alt={value.titulo} src={value.foto_capa} />
                                    </ListItemAvatar>
                                    <ListItemText primary={value.titulo} secondary={value.autor} />

                                    <ListItemSecondaryAction>
                                        <Hidden smUp>
                                            <IconButton edge="end" onClick={handleButtonDownloadClick(value)}>
                                                { value.isDownloadable
                                                    ?
                                                    <GetAppIcon color='primary'/>
                                                    :
                                                    <OpenInNewIcon color='primary'/>
                                                }
                                            </IconButton>
                                        </Hidden>
                                        <Hidden smDown>
                                            <Button startIcon={value.isDownloadable ? <GetAppIcon color='primary'/> : <OpenInNewIcon color='primary'/>}
                                                    size={'small'} color={'primary'}
                                                    onClick={handleButtonDownloadClick(value)}
                                                    disableElevation>{value.isDownloadable ? 'Baixar' : 'Abrir'} {produtoCompradoStateApi.produtoComprado.tipo}</Button>
                                        </Hidden>
                                    </ListItemSecondaryAction>

                                </ListItem>
                                {value.descricao &&
                                    <Typography style={{paddingRight: 16, paddingLeft: 16, marginBottom: 6}}
                                                variant="body2" color="textSecondary" component="p" align='justify' children={value.descricao}/>
                                }
                            </>

                        ))}

                    </List>

                    {produtoCompradoStateApi.produtoComprado.contacto &&
                    <Box px={2} py={1}>
                        <Typography variant={'caption'}
                                    color={'textSecondary'}>Suporte: {produtoCompradoStateApi.produtoComprado.contacto}</Typography>
                    </Box>}
                </Box>
            </Grid>
        </Grid>
        }

        { produtoCompradoStateApi.isGettingProdutoComprado &&
            <CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>
        }

        { produtoCompradoStateApi.err &&
            <ErrComponent messageDefault='Ophs, ocorreu um erro ao carregar o seu produto comprado.' err={produtoCompradoStateApi.err} />
        }

        <Backdrop className={classes.backdrop} open={openBackDropDownload}>
            <CircularProgress color="inherit" />
            <Typography style={{marginLeft: 11}} variant='body2'>Aguarde...</Typography>
        </Backdrop>

        <PageSnackBar snackBarOpened={snackBarOpened} handleClose={() => setSnackBarOpened(false)} message={messageSnackBar}/>
    </>
  );
}
