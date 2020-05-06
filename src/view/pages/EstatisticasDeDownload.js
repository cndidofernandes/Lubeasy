import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from '@material-ui/core/styles';
import AppBarWithBackButton from "../customComponents/AppBarWithBackButton";
import Grid from '@material-ui/core/Grid';

//import { useSelector } from 'react-redux';

//import {Auth0} from "../../utils/Auth-spa";
import Avatar from '@material-ui/core/Avatar';

import { domain_api } from "../../utils/ApiConfig";

import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase/index";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import grey from "@material-ui/core/colors/grey";
import CardMedia from "@material-ui/core/CardMedia";
import AppLogoFull from "../../assets/full_logo.png";


const useStyle = makeStyles(theme=>({
    margemEsquerda:{
        marginLeft:theme.spacing(1)
    },
    avatar:{
        background:theme.palette.primary.main
    }
}));


const CircularLogo = withStyles(theme => ({
    root: {
        width: 40,
        height: 40
    },
}))(Avatar);


const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BLinkCustomMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


function MainContentHome({data}) {
    let classes = useStyle();
    const [formSubmiting, setFormSubmiting] = React.useState(false);
    const [filtro, setFiltro] = React.useState('total');

    const Categorias= [
         'Som',
         'Video',
         'Imagem',
         'Livro',
    ];

    data.valorAutor=(data.totalRecebido*0.97).toFixed();
    data.valorLubeasy = (data.totalRecebido-data.valorAutor);

    const handleChange = (e) => {
            setFiltro(e.target.value);
    };
    React.useEffect(()=>{
        (function () {
            console.log('obter Dados de ',filtro);
            /*Todo Obter os dados usa o idProduto e filtro*/
        })();

    }, [filtro]);


    return (
        <>
            <Grid container justify={'center'}>
                <Grid item xs={11} sm={7} md={6}>

                    <Box my={2} display={'flex'} alignItems={'center'}>
                        <CardMedia style={{width: 100, height: 100}} image={'https://i.pinimg.com/originals/23/34/5a/23345a0edaeee4970432812c2c34d647.jpg'} title={'hjhj'}></CardMedia>
                        <div className={classes.margemEsquerda}>
                            <Typography noWrap variant={'subtitle2'}>{data.titulo}</Typography>
                            <Typography noWrap variant={'body2'} color={'textSecondary'} children={data.preco+' Kz'}/>
                            <Typography variant={'body2'} color={'textSecondary'} children={data.dataDePublicacao} />
                        </div>
                    </Box>
                    <br/>
                    <br/>
                    <Typography variant={'body2'} align={'center'} color={'textSecondary'} color={'secondary'}>
                        Meu Lucro
                    </Typography>
                    <Typography align={'center'} variant={'h4'} color={'primary'} style={{fontWeight:'bold', marginTop: 4}} >
                        {data.valorAutor},00
                    </Typography>
                    <Typography variant={'body1'} align={'center'} style={{fontWeight:'bolder'}} color={'primary'}>
                        Kz
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                    <Typography noWrap variant={'h6'} style={{fontWeight:'bolder', marginBottom: 12}} children={'Detalhes da venda do produto:'}/>

                    <Box display={'flex'} justifyContent={'space-between'} textOverflow="ellipsis" py={0.8}>
                        <Typography noWrap variant={'body1'} color={'textSecondary'} children={'Número de vendas: '}/>
                        <Typography color={'textSecondary'} children={data.pessoasPorPagar}/>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} textOverflow="ellipsis" py={0.8}>
                        <Typography noWrap variant={'body1'} color={'textSecondary'} children={'Montante feito: '}/>
                        <Typography color={'textSecondary'} children={data.pessoasPorPagar+' Kz'}/>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} textOverflow="ellipsis" py={0.8}>
                        <Typography noWrap variant={'body1'} color={'textSecondary'} children={'Pedidos de compra: '}/>
                        <Typography color={'textSecondary'} children={data.pessoasPorPagar}/>
                    </Box>
                    <Divider/>
                    <Box display={'flex'} justifyContent={'space-between'} textOverflow="ellipsis" py={2}>
                        <Typography noWrap variant={'caption'} color={'textSecondary'} children={'Data de expiração:'}/>
                        <Typography noWrap variant={'caption'} color={'textSecondary'} children={'10/10/2020'}/>
                    </Box>

                    <br/>
                    <br/>
                </Grid>
            </Grid>
            </>
    );
}

export default function MinhasComprasPage() {
    const [networkObj, setNetworkObj] = React.useState({
        isLoading: true,
        data: null,
        err: null
    });

    /*const user = useSelector((stateApp) => {
        return stateApp.getUser;
    });*/

    const getEventosFromApi = (accessToken) => {

        axios({
            baseURL: domain_api,
            url: '/minascompras',
            method: 'get',
            headers: {Authorization: 'Bearer '+accessToken},
            params: {
                page: 1,
                pageSize: 10
            },
        })
            .then(function (response) {
                setNetworkObj({isLoading: false, data: response.data, err: null});
            })
            .catch(function (error) {
                setNetworkObj({...networkObj, isLoading: false, err: error});
            });
    }

    const getDynamicContent = () => {
        // Todo: Descomentar o codigo a baixo
        /*if (networkObj.isLoading) {
            return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
        }else if (networkObj.err) {
            return (<ErrComponent messageDefault='Ophs, ocorreu um erro ao carregar os eventos.' err={networkObj.err} />);
        } else {
            return (<MainContentHome data={networkObj.data} />);
        }*/
        return (<MainContentHome />)

    }

    React.useEffect(function(){

        /*Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {
                getEventosFromApi(accessToken);
            });
        });*/

    }, []);

    return (
        <div style={{background:'white'}}>
            <AppBar position={"static"}
                    style={{
                        top:0,
                        left:0,
                        color:'black',
                        background: '#FFFFFF',
                        boxShadow: 'none',
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 1,
                        borderBottomColor: grey[100]
                    }}>
                <Toolbar>
                    <img src={AppLogoFull}
                         alt={'Lubeasy logo'}
                         style={{ height: 46, width: 146}}/>
                    <Typography noWrap variant={'h6'} color={'textSecondary'} align={'center'}
                                style={{flexGrow: 1, paddingLeft: 4, paddingRight: 4}}>Autor</Typography>
                </Toolbar>
            </AppBar>
            {getDynamicContent()}
        </div>
    );
}


MainContentHome.defaultProps={
    data: {
        totalCompras: 2,
        pessoasPorPagar: 5,
        totalPorReceber: 400,
        totalRecebido: 1400,
        titulo: 'Spark',
        categoria: 3,
        tipo: 'Cómico',
        preco: 80,
        dataDePublicacao: '2020-04-21 00:00:00',
    }
};











/*Todo: como já tens aí a lib de data e tempo, é só meteres os cálculos. No primeiro é o hoje e o segundo é o últimos 10 dias*/
let produto={};
let dataDeCriacaoDownload = produto.filtro==='total'?"":'';

let query = `SELECT
(SELECT COUNT(download.id) FROM download WHERE (download.idProdutoDigital='${produto.id}' AND download.isPay=1 AND download.dataDeCriacao<='${dataDeCriacaoDownload}')) AS totalCompras,

(SELECT COUNT(download.id) FROM download WHERE (download.idProdutoDigital='${produto.id}' AND download.isPay=0 AND download.dataDeCriacao<='${dataDeCriacaoDownload}')) AS pessoasPorPagar,

(SELECT SUM(produto_digital.preco) FROM produto_digital INNER JOIN download ON produto_digital.id = download.idProdutoDigital WHERE (download.idProdutoDigital='${produto.id}' AND download.isPay=0 AND download.dataDeCriacao<='${dataDeCriacaoDownload}')) AS totalPorReceber,

(SELECT SUM(produto_digital.preco) FROM produto_digital INNER JOIN download ON produto_digital.id = download.idProdutoDigital WHERE (download.idProdutoDigital='${produto.id}' AND download.isPay=1 AND download.dataDeCriacao<='${dataDeCriacaoDownload}')) AS totalRecebido,
produto_digital.titulo, produto_digital.categoria, produto_digital.tipo, produto_digital.preco, produto_digital.dataDePublicacao FROM produto_digital LEFT JOIN download ON produto_digital.id=download.idProdutoDigital WHERE (produto_digital.id='${produto.id}' AND download.dataDeCriacao<='${dataDeCriacaoDownload}') GROUP BY produto_digital.id
`;






















