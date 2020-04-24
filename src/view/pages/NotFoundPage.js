import React from 'react';
import { Grid } from '@material-ui/core';
import ProdutoItem from "../customComponents/ProdutoItem";

// import { Container } from './styles';

/*export default function pages() {
  return (
    <Grid container justify="center" alignItems="center" style={{margin: 16}}>
        <Grid item xs={12} md={9} lg={6}>
          <h1>404.</h1>   
          <h3>Página não encontrada.</h3>
        </Grid>
    </Grid>
  );
}*/


export default function PageNotFound() {
  return (
    <Grid container justify="center" alignItems="center" style={{margin: 16}}>
        <Grid item xs={12} md={9} lg={6}>
            <h1>Page not found</h1>
        </Grid>
    </Grid>
  );
}
