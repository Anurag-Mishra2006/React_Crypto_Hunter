import { makeStyles } from '@mui/styles'
import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: "url(/banner2.jpg)"
    },
    bannerContent: {
        height: 400, 
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline:{
        display: 'flex',
        flexDirection: 'column',
        height: '40%',
        justifyContent: 'center',
        textAlign: 'center'
    }
}))

function Banner() {
    const classes = useStyles();
  return (
    <div className= {classes.banner}>
        <Container className={classes.bannerContent}>

            <div className={classes.tagline}>
                 <Typography
                 variant='h2'
                 style={
                    {
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat",

                    }
                 }
                 >
                    Crypto Hunter
                 </Typography>
                 <Typography
                 variant='subtitle2'
                 style={{
                    color: 'darkgrey',
                    textTransform: 'capitalize',
                    fontFamily : "Montserrat"
                 }}
                 >
                    Get All The Information Regarding Your Favourite Crypto Currency 
                 </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner