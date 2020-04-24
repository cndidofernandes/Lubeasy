import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    card: {
        margin:8,
        minWidth: 150,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize:'72pt'
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard({icon, title, primary, secondary, text, href, disabledAction}) {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={0} >
            <CardContent>
                <Box align={'center'}>
                    <Typography gutterBottom>
                        {icon}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" >
                        {primary}
                    </Typography>
                    <Typography variant="body2" component="p" color="textSecondary">
                        {secondary}
                    </Typography>
                </Box>
            </CardContent>
           {!disabledAction && 
           <CardActions>
                <Box mx={'auto'}>
                    <Button size="small" color={'primary'}>Enviar agora</Button>
                </Box>
            </CardActions>}
        </Card>
    );
}
