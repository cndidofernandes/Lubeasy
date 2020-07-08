import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

import CircularProgress from "@material-ui/core/CircularProgress";
import ErrComponent from "../customComponents/Err";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import {domain_api} from "../../utils/ApiConfig";
import SubscricaoItem from "../customComponents/SubscricaoItem";

import { getTokenAccess } from "../../services/Cliente";

const useStyles = makeStyles((theme) => ({
    appBar:{
        top: 0,
        left: 0,
        color:'black',
        background: theme.palette.background.paper,
        boxShadow: 'none',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: grey[100]
    },
    iconButton: {
        marginRight: theme.spacing(2)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    containerGrid: {
        [theme.breakpoints.up('xs')]: {
            paddingTop: 8
        },
    },

}));

const renderProdutoItem = (value, idx) => {
    return ( <Grid key={value.id} item xs={6} sm={4} md={3} xl={2}>
        <SubscricaoItem
            id={value.id}
            uuid={value.uuid}
            imagemProduto={value.capa}
            nomeProduto={value.titulo}
            autorProduto={value.autor}
            tipoProduto={value.tipo}
            formatoProduto={value.formato}
            endOfSubscription={value.endOfSubscription} />
    </Grid>)
}


export default function MinhasSubscricoesPage(props) {
    const classes = useStyles();

    const [produtoAssinadosResponseApi, setProdutoAssinadosResponseApi] = React.useState({
        hasMore: false,
        page: 0,
        pageSize: 7,
        listProduto: [],
        accessToken: null,
        err: null
    });

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getProdutosAssinadosFromApi = (accessToken) => {

        axios({
            baseURL: domain_api,
            url: '/produto/subscricao',
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            params: {
                page: produtoAssinadosResponseApi.page+1,
                pageSize: produtoAssinadosResponseApi.pageSize
            },
            cancelToken: source.token,
        })
            .then(function (response) {
                setProdutoAssinadosResponseApi({
                    hasMore: response.data.hasMore,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    listProduto: [...produtoAssinadosResponseApi.listProduto, ...response.data.listProduto],
                    accessToken: accessToken
                });
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error);
                    return;
                }
                setProdutoAssinadosResponseApi({...produtoAssinadosResponseApi, hasMore: false, err: error});
            });
    }

    const getDynamicContent = () => {
        if (produtoAssinadosResponseApi.listProduto.length === 0 && !produtoAssinadosResponseApi.err) {
            return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
        }else if (produtoAssinadosResponseApi.err && produtoAssinadosResponseApi.listProduto.length === 0) {
            return (<ErrComponent messageDefault='Ophs, ocorreu um erro ao carregar as suas assinaturas.' err={produtoAssinadosResponseApi.err} />);
        } else {
            return (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={ () => getProdutosAssinadosFromApi(produtoAssinadosResponseApi.accessToken)}
                    hasMore={produtoAssinadosResponseApi.hasMore}
                    loader={<CircularProgress size={16} style={{position:'absolute', left:'50%', marginLeft: -20, marginBottom: 20}}/>}>
                    {
                        <Grid container justify="flex-start" alignItems="flex-start" style={{marginTop: 8, marginBottom: 8, paddingLeft: 8, paddingRight: 8}}>
                            {produtoAssinadosResponseApi.listProduto.map( (value, index) => renderProdutoItem(value, index) )}
                        </Grid>
                    }
                </InfiniteScroll>
            );
        }
    }

    React.useEffect(function(){

        getProdutosAssinadosFromApi(getTokenAccess());

        return () => {
            source.cancel('Request Cancel');
        }
    }, []);

    return (
        <>
            <AppBar className={classes.appBar} position={"static"} style={{color:'black', background: '#FFFFFF', boxShadow: 'none'}}>
                <Toolbar>
                    <IconButton onClick={() => props.history.goBack()} edge={'start'} className={classes.iconButton}>
                        <ArrowBackIosRoundedIcon/>
                    </IconButton>
                    <Typography variant={'subtitle1'} style={{color: '#515149'}}>
                        Minhas subscrições
                    </Typography>
                </Toolbar>
            </AppBar>
            {getDynamicContent()}

        </>
    );
}
