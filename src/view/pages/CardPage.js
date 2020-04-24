import React from 'react';
import Grid from "@material-ui/core/Grid";
import CardItem from "../customComponents/CardItem";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';

export default function (props) {
    return(
        <>
            <Grid container justify={'center'}>
                <Grid item xs={11} sm={4} md={3}>
                    <CardItem icon={
                        <FacebookIcon style={{color:'#0a2dff', fontSize:'72pt'}} />
                    }
                              title={'Via Facebook'}
                              primary={'Aberto todos os dias 8h - 20h'}
                              disabledAction={props.disabledAction}
                              secondary={<>
                                  <Typography variant="body2" component="span" color="primary">
                                          Lubeasy
                                  </Typography> é a nossa <br />
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
                              primary={'Aberto todos os dias 8h - 20h'}
                              disabledAction={props.disabledAction}
                              secondary={<>
                                  <Typography variant="body2" component="span" color="primary">
                                      935457646 / 943738027
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
                              primary={'Aberto todos os dias 8h - 20h'}
                              disabledAction={props.disabledAction}
                              secondary={<>
                                  <Typography variant="body2" component="span" color="primary">
                                      Lubeasy
                                  </Typography> é o nosso <br />
                                  perfil no Instagram
                              </>
                              }
                    />
                </Grid>
            </Grid>
        </>
    )
}