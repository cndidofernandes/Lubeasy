import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import CircularProgress from "@material-ui/core/CircularProgress";
import ErrComponent from "../customComponents/Err";
import InfiniteScroll from "react-infinite-scroller";
import {Auth0} from "../../utils/Auth-spa";
import axios from "axios";
import {domain_api} from "../../utils/ApiConfig";

import {useParams} from "react-router-dom";
import PHPdateTime from "../../utils/PHPdateTime";

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


function ConteudoDaSubscricaoItem(props) {

    const handleOpenContentClickButton = () => {
        if (props.urlContent){
            const link = document.createElement('a');
            link.href = props.urlContent;
            link.title = 'Abrir conteúdo';
            link.target = '_blank';
            link.rel = 'noopener';
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    }

    return (
        <Card style={{marginBottom: 16, marginLeft: 4, marginRight: 4}} elevation={0}>
            <CardActionArea onClick={handleOpenContentClickButton}>
                <CardMedia
                    component="img"
                    style={{height: 200}}
                    image="https://psdflyer.co/wp-content/uploads/2019/02/urban-sound-psd-free-flyer-template-v2-download1.jpg"
                    title="Contemplative Reptile"/>
                <CardContent>

                    <Typography variant="overline" color="textSecondary">
                        {props.tipo}
                    </Typography>

                    <Typography variant="subtitle1">
                        <b>{props.titulo}</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {props.descricao}
                    </Typography>

                    <br/>

                    <Typography variant="caption">
                        {props.autor} • {PHPdateTime('d m Y', props.create_at)}
                    </Typography>

                </CardContent>

                {/*<CardActions>
                    <Button size="small" color={'primary'} onClick={handleOpenContentClickButton}>Abrir
                        conteúdo</Button>
                </CardActions>*/}

            </CardActionArea>

        </Card>
    )
}

const renderProdutoItem = (value, idx) => {
    return (
        <Grid key={value.id} item xs={12} sm={6} md={3} xl={2}>
            <ConteudoDaSubscricaoItem
                id={value.id}
                titulo={value.titulo}
                autor={value.autor}
                tipo={value.tipo}
                descricao={value.descricao}
                urlContent={value.urlContent}
                create_at={value.create_at} />
        </Grid>)
}


export default function SubscricaoPage(props) {
    const classes = useStyles();

    const {idSubscricao, nomeDaSubscricao} = useParams();

    const [conteudoDoProdutoAssinadoResponseApi, setConteudoDoProdutoAssinadoResponseApi] = React.useState({
        hasMore: false,
        page: 0,
        pageSize: 7,
        listConteudo: [],
        accessToken: null,
        err: null
    });

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getProdutosAssinadosFromApi = (accessToken) => {

        axios({
            baseURL: domain_api,
            url: `/produto/subscricao/${idSubscricao}/conteudo`,
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            params: {
                page: conteudoDoProdutoAssinadoResponseApi.page+1,
                pageSize: conteudoDoProdutoAssinadoResponseApi.pageSize
            },
            cancelToken: source.token,
        })
            .then(function (response) {
                setConteudoDoProdutoAssinadoResponseApi({
                    hasMore: response.data.hasMore,
                    page: response.data.page,
                    pageSize: response.data.pageSize,
                    listConteudo: [...conteudoDoProdutoAssinadoResponseApi.listConteudo, ...response.data.listConteudo],
                    accessToken: accessToken
                });
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error);
                    return;
                }
                setConteudoDoProdutoAssinadoResponseApi({...conteudoDoProdutoAssinadoResponseApi, hasMore: false, err: error});
            });
    }

    const getDynamicContent = () => {
        if (conteudoDoProdutoAssinadoResponseApi.listConteudo.length === 0 && !conteudoDoProdutoAssinadoResponseApi.err) {
            return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
        }else if (conteudoDoProdutoAssinadoResponseApi.err && conteudoDoProdutoAssinadoResponseApi.listConteudo.length === 0) {
            return (<ErrComponent messageDefault='Ophs, ocorreu um erro ao carregar o conteúdo da assinatura.' err={conteudoDoProdutoAssinadoResponseApi.err} />);
        } else {
            return (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={ () => getProdutosAssinadosFromApi(conteudoDoProdutoAssinadoResponseApi.accessToken)}
                    hasMore={conteudoDoProdutoAssinadoResponseApi.hasMore}
                    loader={<CircularProgress size={16} style={{position:'absolute', left:'50%', marginLeft: -20, marginBottom: 20}}/>}>
                    {
                        <Grid container justify="flex-start" alignItems="flex-start" style={{marginTop: 12, marginBottom: 8, paddingLeft: 8, paddingRight: 8}}>
                            {conteudoDoProdutoAssinadoResponseApi.listConteudo.map( (value, index) => renderProdutoItem(value, index) )}
                        </Grid>
                    }
                </InfiniteScroll>
            );
        }
    }

    React.useEffect(function(){

        Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {
                getProdutosAssinadosFromApi(accessToken);
            });
        }).catch(function (error) {
            setConteudoDoProdutoAssinadoResponseApi({...conteudoDoProdutoAssinadoResponseApi, err: {request: 'Ocorreu um erro, por favor, recarregue a página'}});
        });

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
                        {nomeDaSubscricao}
                    </Typography>
                </Toolbar>
            </AppBar>
            {getDynamicContent()}

        </>
    );
}
