import React from 'react';
import axios from "axios";

import { Typography, CircularProgress } from '@material-ui/core';

import styles from './RecommendedProdutosHorizontal.module.css'

import RecommendItem from './RecommendItem';
import { domain_api } from "../../utils/ApiConfig";

const renderRecommendItem = (value, idx) => {
  return (<RecommendItem key={value.uuid}
                  uuid={value.uuid}
                  capa={value.capa} 
                  autor={value.autor} 
                  titulo={value.titulo} 
                  preco={value.preco} 
                  formato={value.formato} />)
}

export default function RecommendedProdutosHorizontal(props) {

  const [networkObj, setNetworkObj] = React.useState({
    isLoading: true,
    data: null,
    err: null
  });

  const getProdutoRecommendedFromApi = () => {
    axios({
      baseURL: domain_api,
      url: `/produto/recommended?uuid=${props.uuidProduto}&${props.by}=${props.data}&limit=4`,
      method: 'get',
    })
    .then(function (response) {
      setNetworkObj({isLoading: false, data: response.data, err: null});
    })
    .catch(function (error) {
        setNetworkObj({...networkObj, isLoading: false, err: error});
    });
  }

  const MainContent = ({listProdutoRecommended}) => {
    return (
      <>
        <div className={styles.mainContent} style={{transform: 'translateZ(0)'}}>
          {listProdutoRecommended.map( (value, index) => renderRecommendItem(value, index) )}
        </div>
      </>
    );
  }

  const getDynamicContent = () => {
    if (networkObj.isLoading) {
        return (
          <div style={{background: '#fff', padding: 20}}>
            <CircularProgress style={{position:'absolute', left:'50%'}} size={20} color='secondary'/>
          </div>
        )
        
    }else if (networkObj.err) {
      var elementErr = null;
      const messageUnauthorization = "Algo muito estralho esta a passar-se, por favor recarrege a página. "
      const styleErr={
        marginTop: 8,
        marginLeft: 16,
      }

      if (networkObj.err.response) {
        elementErr = <Typography variant='body2' color='textSecondary' style={styleErr}>{networkObj.err.status === 401 ? messageUnauthorization : networkObj.err.response.data.description}</Typography>
      }else if (networkObj.err.request) {
        elementErr = <Typography variant='body2' color='textSecondary' style={styleErr}>{'Ophs, estamos com problemas na conexão com o servidor, por favor verifique a sua conexão com internet.'}</Typography>
      }else {
        elementErr = <Typography variant='body2' color='textSecondary' style={styleErr}>{'Ophs, ocorreu um erro desconhecido.'}</Typography>
      }
      
      return elementErr;
    } else {
        return (<MainContent {...networkObj.data} />);
    }
  }

  React.useEffect(function(){
    getProdutoRecommendedFromApi();
  }, []);

  return getDynamicContent();
}
