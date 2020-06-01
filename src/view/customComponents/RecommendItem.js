import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";

export default function RecommendItem(props) {
  const history = useHistory();

  const onClickRecommendItem = (e) => {
    history.push(props.uuid);
  }

  return (
    <Box style={{width: 172, marginRight: 8, display: 'inline-block'}}
         onClick={onClickRecommendItem} my={1}
         bgcolor='background.paper'
         borderRadius={4}
         borderColor="grey.200"
         border={1}>
        <CardMedia style={{width: 170,height: 210}} image={props.capa} title={props.titulo} />
        <Box m={0.8}>
            <Typography variant='subtitle2' noWrap>{props.titulo}</Typography>
            <Typography variant='caption' color='secondary' style={{marginTop: 8}}>{props.preco} Kz</Typography>
        </Box>
        {/*<Button style={{marginTop: 4}} onClick={onClickRecommendItem} color='secondary' variant='outlined'
                 disableElevation size='small' fullWidth>comprar</Button>*/}
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
