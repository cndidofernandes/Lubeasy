import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export default function RecommendItem(props) {
  const history = useHistory();

  const onClickRecommendItem = (e) => {
    history.push(props.uuid);
  }

  return (
    <Box style={{width: 170, marginRight: 8}} my={0.5} bgcolor='background.paper'>
        <img style={{width: 170, height: 170}} src={props.capa} alt={props.titulo} />
        <Box m={0.8}>
            <Typography variant='subtitle1'>{props.titulo}</Typography>
            <Typography variant='body2' color='secondary'>{props.preco} Kz</Typography>
            <Button style={{marginTop: 4}} onClick={onClickRecommendItem} color='secondary' variant='contained' disableElevation size='small'>comprar</Button>
        </Box>

    </Box>
  );
}

RecommendItem.propTypes = {
    capa: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
}
  
RecommendItem.defaultProps = {
    capa: 'https://i.pinimg.com/originals/23/34/5a/23345a0edaeee4970432812c2c34d647.jpg',
    titulo: 'Caos (Mixtape)',
    autor: 'Desconhecido',
    preco: 9999,
}
