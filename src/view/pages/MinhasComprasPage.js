import React from 'react';

import Grid from '@material-ui/core/Grid';
import MinhaCompraItem from "../customComponents/MinhaCompraItem";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Backdrop from '@material-ui/core/Backdrop';
import { CircularProgress, Typography } from '@material-ui/core';

import ErrComponent from "../customComponents/Err";
import PorPagar from "../customComponents/Drawer/PorPagar";

import { domain_api } from "../../utils/ApiConfig";

import axios from "axios";

import InfiniteScroll from 'react-infinite-scroller';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import grey from "@material-ui/core/colors/grey";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { getTokenAccess } from "../../services/Cliente";

const useStyles = makeStyles((theme) => ({
    appBar:{
        top:0,
        left:0,
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


const renderMinhasComprasItem = (value, idx, accessToken, handlers) => {
    return (<MinhaCompraItem key={(value.id)}
                    idCompra={value.id}
                    idProdutoDigital={value.idProdutoDigital}
                    titulo={value.titulo} 
                    autor={value.autor} 
                    preco={value.preco}
                    isPay={value.isPay}
                    accessToken={accessToken}
                    handlePorPagarDrawer={handlers.handlePorPagarDrawer}
                    formato={value.formato}
                    dataDaCompra={value.dataDeCriacao} />)
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanelMinhasCompras(props) {
    const {value, index, downloadResponseApi, setDownloadResponseApi, getMyDownloadsFromApi, subheader, ...other } = props;
    const isFilterComprasPagas = value === 1;
    const listCompraFilter = downloadResponseApi.listCompra.filter( (value) => value.isPay === isFilterComprasPagas )

    const classes = useStyles();

    const [openPorPagarDrawer, setOpenPorPagarDrawer] = React.useState(false);
    const [openBackDropDownload, setOpenBackDropDownload] = React.useState(false);
    const [infoFromItemToPorPagarDrawer, setInfoFromItemToPorPagarDrawer] = React.useState({
        priceToPay: 0,
        hashTagDownload: '#0'
    });

    const handlePorPagarDrawer = (priceToPay) => {
        setOpenPorPagarDrawer(true);
        setInfoFromItemToPorPagarDrawer(priceToPay)
    }

    const getCorrectContent = () => {

        if(downloadResponseApi.listCompra.length === 0 && !downloadResponseApi.err){
            return (
                <Box py={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress />
                </Box>
                )
        } else if (downloadResponseApi.err && downloadResponseApi.listCompra.length === 0) {
            return (<ErrComponent messageDefault='Ophs, ocorreu um erro ao buscar as suas compras.' err={downloadResponseApi.err} />);
        } else {
            return (
                <Grid container justify={'center'} alignItems={'center'} className={classes.containerGrid}>
                    <Grid item xs={12} sm={8} md={6}>
                        <List style={{background: '#fff'}} subheader={<ListSubheader>{subheader}</ListSubheader>}>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={ () => getMyDownloadsFromApi(downloadResponseApi.accessToken)}
                                hasMore={downloadResponseApi.hasMore}
                                loader={<CircularProgress size={18} style={{position:'absolute', left:'50%', marginLeft: -20, marginBottom: 20}}/>}>
                                {
                                    listCompraFilter.map( (value, index) => renderMinhasComprasItem(value, index, downloadResponseApi.accessToken, {handlePorPagarDrawer}) )
                                }
                            </InfiniteScroll>
                        </List>
                        {(listCompraFilter.length === 0) && (
                            <Paper elevation={0} style={{padding: 16, paddingBottom: 40}}>
                                <Typography variant={'body2'} align={'center'}>{isFilterComprasPagas ? 'Você ainda não tem nenhum produto pago.' : 'Você pagou todas as suas compras!'}</Typography>
                            </Paper>)
                        }
                        <PorPagar open={openPorPagarDrawer}
                                  handleCloseDrawer={() => setOpenPorPagarDrawer(false)}
                                  priceToPay={infoFromItemToPorPagarDrawer.priceToPay}
                                  hashTagDownload={infoFromItemToPorPagarDrawer.hashTagDownload} />

                        <Backdrop className={classes.backdrop} open={openBackDropDownload}>
                            <CircularProgress color="inherit" />
                            <Typography style={{marginLeft: 11}} variant='body2'>Aguarde...</Typography>
                        </Backdrop>
                    </Grid>

                </Grid>
            );
        }

    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (getCorrectContent())}
        </div>
    );
}

export default function MinhasComprasPage(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [tabValue, setTabValue] = React.useState(0);

    const [downloadResponseApi, setDownloadResponseApi] = React.useState({
        hasMore: false,
        page: 0,
        pageSize: 11,
        listCompra: [],
        accessToken: null,
        err: null
    });

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const handleChangeTabValue = (event, newTabValue) => {
        setTabValue(newTabValue);
    };
    const handleChangeIndexTabValue = (index) => {
        setTabValue(index);
    };

    const getMyDownloadsFromApi = (accessToken) => {

        axios({
            baseURL: domain_api,
            url: '/compra',
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            params: {
                page: downloadResponseApi.page+1,
                pageSize: downloadResponseApi.pageSize
            },
            cancelToken: source.token,
        })
            .then(function (response) {
                setDownloadResponseApi({
                    hasMore: response.data.hasMore,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    listCompra: [...downloadResponseApi.listCompra, ...response.data.listCompra],
                    accessToken: accessToken
                });
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error);
                    return;
                }
                setDownloadResponseApi({...downloadResponseApi, hasMore: false, err: error});
            });
    }

    React.useEffect(function(){

        getMyDownloadsFromApi(getTokenAccess());

        return () => {
            source.cancel('Request Cancel Minhas');
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
                        Minhas compras
                    </Typography>
                </Toolbar>
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                    aria-label="disabled tabs example"
                >
                    <Tab label="Por Pagar" {...a11yProps(0)} />
                    <Tab label="Pagas" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabValue}
                onChangeIndex={() => handleChangeIndexTabValue(tabValue)}
            >
                <TabPanelMinhasCompras subheader='Produtos por pagar:'
                                       downloadResponseApi={downloadResponseApi}
                                       setDownloadResponseApi={setDownloadResponseApi}
                                       getMyDownloadsFromApi={getMyDownloadsFromApi}
                                       value={tabValue} index={0}
                                       dir={theme.direction} />

                <TabPanelMinhasCompras subheader='Produtos pagos:'
                                       downloadResponseApi={downloadResponseApi}
                                       setDownloadResponseApi={setDownloadResponseApi}
                                       getMyDownloadsFromApi={getMyDownloadsFromApi}
                                       value={tabValue} index={1}
                                       dir={theme.direction} />
            </SwipeableViews>

        </>
    );
}