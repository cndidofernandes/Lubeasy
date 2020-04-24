import React from 'react';
import axios from "axios";

import { Grid, Typography, Box, CircularProgress } from '@material-ui/core';


import ErrComponent from "./Err";
import RecommendItem from './RecommendItem';
import { domain_api } from "../../utils/ApiConfig";

const renderRecommendItem = (value, idx) => {
  return (<RecommendItem key={(idx)}
                  uuid={value.uuid}
                  capa={value.capa} 
                  autor={value.autor} 
                  titulo={value.titulo} 
                  preco={value.preco} 
                  categoria={value.categoria} />)
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
      url: `/produto/recommended?${props.by}=${props.data}&limit=4`,
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
            <Typography variant="subtitle1" style={{marginTop: 16, marginLeft: 16, fontWeight: 'bold'}}>{'Recomendações para si'}</Typography>
            <div style={{display: 'flex', overflowY: 'scroll', paddingLeft: 16, paddingRight: 16}}>
              {listProdutoRecommended.map( (value, index) => renderRecommendItem(value, index) )}
            </div>
      </>
    );
  }

  const getDynamicContent = () => {
    if (networkObj.isLoading) {
        return (<CircularProgress style={{position:'absolute', top:'50%', left:'50%',marginTop: -20,marginLeft: -20,}}/>)
    }else if (networkObj.err) {
        return (<ErrComponent err={networkObj.err} />);
    } else {
        return (<MainContent {...networkObj.data} />);
    }
  }

  React.useEffect(function(){
    getProdutoRecommendedFromApi();
  }, []);

  return getDynamicContent();

}
