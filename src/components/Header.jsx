import AppBar from '@mui/material/AppBar'
import React from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@mui/styles'
import { useNavigate} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CryptoState } from '../CryptoContext'
import AuthModel from './Authentication/AuthModel'
import  UserSidebar  from "./Authentication/UserSidebar"


const useStyle = makeStyles(()=>({
    title:{
        flex:1,
        color:"gold",
        fontFamily : "Montserrat",
        fontWeight : "bold" ,
        cursor: "pointer",

    }
}))

function Header() {
    const classes = useStyle();
    const navigate = useNavigate();

    const { currency, setCurrency,user} = CryptoState();
    // console.log(currency);
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        }
    })
  return (
   < ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={()=>navigate('/')}
                 variant='h6'
                 className={classes.title}>
                    Crypto Hunter
                </Typography>
                <Select variant='outlined' style={{
                    width: 100, 
                    height: 40,
                    marginRight: 15
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}

                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value= {"INR"}>INR</MenuItem>
                </Select>
                {user ? <UserSidebar />: <AuthModel/>}
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header