import { LinearProgress, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../utils/numberWithCommas";
import { CryptoState } from "../CryptoContext";
import { doc,setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol,user, watchlist,setAlert } = CryptoState();

  // variable for checking if something add in watchlist or not
  const inWatchlist = watchlist.includes(coin?.id);
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  
  const addToWatchlist =async()=>{
      const  coinRef = doc(db,'watchlist', user.uid);

      try {
        await setDoc(coinRef,{
          coins: watchlist?[...watchlist, coin.id] : [coin?.id]
        });

        setAlert({
          open: true,
          message: `${coin.name} Added to Watchlist !`,
          type: 'success'
        })

      } catch (error) {
        console.error(error.message)
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        })
      }
  }
 const removeFromWatchlist = async () => {
      const  coinRef = doc(db,'watchlist', user.uid);

      try {
        await setDoc(coinRef,
          {
          coins: watchlist.filter((watch)=> watch != coin?.id)
        }, {
          merge: 'true'
        }
      );

        setAlert({
          open: true,
          message: `${coin.name} Removed from Watchlist !`,
          type: 'success'
        })

      } catch (error) {
        console.error(error.message)
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        })
      }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" }
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: { md: "2px solid grey" }
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            p: 3,
            pt: 0,
            textAlign: "justify"
          }}
          dangerouslySetInnerHTML={{
            __html: `${coin?.description.en.split(". ")[0]}.`
          }}
        />
        <Box
          sx={{
            alignSelf: "start",
            p: 3,
            pt: 1,
            width: "100%",
            display: { md: "block", sm: "flex", xs: "block" },
            justifyContent: { sm: "space-around" },
            alignItems: { sm: "center", xs: "flex-start" }
          }}
        >
          {/* Rank */}
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>

          {/* Market Cap */}
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>
              {user &&  (
                <Button 
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: 40,
                    background:inWatchlist ? "#ff0000" :  '#EEBC1D',
                    color: 'black'
                  }}
                  onClick={inWatchlist ?removeFromWatchlist : addToWatchlist}
                >
                  {inWatchlist ? "Remove from Watchlist" :"Add to Watchlist"}
                  </Button>
              )}
        </Box>
      </Box>

      {/* Chart Section */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
