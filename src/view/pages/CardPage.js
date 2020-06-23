import React from 'react';
import Grid from "@material-ui/core/Grid";
import CardItem from "../customComponents/CardItem";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from '@material-ui/core';

export default function (props) {

    return(
        <>
            <Grid container justify={'center'}>
                <Grid item xs={11} sm={4} md={3}>
                    <CardItem icon={
                        <FacebookIcon style={{color:'#0a2dff', fontSize:'72pt'}} />
                    }
                              title={'Via Facebook'}
                              primary={'Aberto todos os dias das 9h - 19h'}
                              disabledAction={props.disabledAction}
                              secondary={<>
                                  <Link variant="body2" color="primary" href="https://www.facebook.com/Lubeasy-101673771434417" target="_blank" rel="noreferrer">
                                    Lubeasy
                                  </Link> é a nossa <br />
                                  página do facebook
                              </>
                              }
                    />
                </Grid>
                <Grid item xs={11} sm={4} md={3}>
                    <CardItem icon={
                        <WhatsAppIcon style={{color:'#00e700', fontSize:'72pt'}} />
                    }
                              title={'Via Whatsapp'}
                              primary={'Aberto todos os dias das 9h - 19h'}
                              disabledAction={props.disabledAction}
                              secondary={<>
                                  <Typography variant="body2" component="span" color="primary">
                                      +244 948280007
                                  </Typography>
                                  
                              </>
                              }
                    />
                </Grid>
                <Grid item xs={11} sm={4} md={3}>
                    <CardItem icon={
                        <InstagramIcon style={{color:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', fontSize:'72pt'}} />
                    }
                              title={'Via Instagram'}
                              primary={'Aberto todos os dias das 9h - 19h'}
                              disabledAction={props.disabledAction}
                              secondary={<>
                                  <Link variant="body2" color="primary" href="https://www.instagram.com/Lubeasy" target="_blank" rel="noreferrer">
                                    Lubeasy
                                  </Link> é o nosso <br />
                                  perfil no Instagram
                              </>
                              }
                    />
                </Grid>
            </Grid>
        </>
    )
}