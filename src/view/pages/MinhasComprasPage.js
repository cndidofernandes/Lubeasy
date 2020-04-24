import React from 'react';

import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";

import Grid from '@material-ui/core/Grid';
import MinhaCompraItem from "../customComponents/MinhaCompraItem";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { CircularProgress } from '@material-ui/core';

import {Auth0} from "../../utils/Auth-spa";
import ErrComponent from "../customComponents/Err";


import { domain_api } from "../../utils/ApiConfig";

import axios from "axios";

import InfiniteScroll from 'react-infinite-scroller';

const renderMinhasComprasItem = (value, idx) => {
    return (<MinhaCompraItem key={(idx)}
                    id={value.id}
                    titulo={value.titulo} 
                    autor={value.autor} 
                    preco={value.preco}
                    isPay={value.isPay}
                    categoria={value.categoria} 
                    dataDaCompra={value.dataDeCriacao} />)
}

export default function MinhasComprasPage() {
    const [downloadResponseApi, setDownloadResponseApi] = React.useState({
        hasMore: false,
        page: 0,
        pageSize: 11,
        listDownload: [],
        accessToken: null,
        err: null
    });

    const getMyDownloadsFromApi = (accessToken) => {

        axios({
            baseURL: domain_api,
            url: '/download',
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            params: {
                page: downloadResponseApi.page+1,
                pageSize: downloadResponseApi.pageSize
            },
        })
        .then(function (response) {
            setDownloadResponseApi({
                hasMore: response.data.hasMore,
                page: response.data.page,
                pageSize: response.data.pageSize,
                listDownload: [...downloadResponseApi.listDownload, ...response.data.listDownload],
                accessToken: accessToken
            });
        })
        .catch(function (error) {
            setDownloadResponseApi({...downloadResponseApi, hasMore: false, err: error});
        });
    }

    React.useEffect(function(){

        Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {
                getMyDownloadsFromApi(accessToken);
            });
        }).catch(function (error) {
            setDownloadResponseApi({...downloadResponseApi, err: {request: 'É um erro do auth0'}});
        });;

    }, []);

    const getCorrectContent = () => {

        if (downloadResponseApi.listDownload.length === 0 && !downloadResponseApi.err) {
            return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
        }else if (downloadResponseApi.err && downloadResponseApi.listDownload.length === 0) {
            return (<ErrComponent messageDefault='Ophs, ocorreu um erro ao buscar as suas compras.' err={downloadResponseApi.err} />);
        } else {
            return (
                <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item xs={12} sm={8} md={6}>  
                        <List style={{background: '#fff'}} subheader={<ListSubheader>Produtos comprados por você:</ListSubheader>}>                            
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={ () => getMyDownloadsFromApi(downloadResponseApi.accessToken)}
                                hasMore={downloadResponseApi.hasMore}
                                loader={<CircularProgress size={18} style={{position:'absolute', left:'50%', marginLeft: -20, marginBottom: 20}}/>}>
                                {downloadResponseApi.listDownload.map( (value, index) => renderMinhasComprasItem(value, index) )}
                            </InfiniteScroll>
                        </List> 
                        { downloadResponseApi.err && 
                            (<ErrComponent messageDefault='Ophs, ocorreu um erro ao carregar as suas compras.' err={downloadResponseApi.err} />)
                        }               
                    </Grid>
                </Grid>
            );            
        }
        
    }
    return (
        <>
            <AppBarWithBackButton titulo={'Minhas compras'}/>
            {getCorrectContent()}
        </>
    );
}














