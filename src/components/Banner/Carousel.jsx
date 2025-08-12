import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
    textDecoration: 'none',
    transition: 'transform 0.2s ease-in-out',
    padding: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  coinImage: {
    marginBottom: 10,
    borderRadius: '50%',
    height: 60,
    width: 60,
    objectFit: 'contain',
  },
  symbolText: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 13,
    fontWeight: 500,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 4,
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
  const classes = useStyles();
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        key={coin.id}
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          className={classes.coinImage}
        />
        <span className={classes.symbolText}>
          {coin?.symbol.toUpperCase()}&nbsp;
          <span
            className={classes.priceChange}
            style={{
              color: profit ? 'rgb(14, 203, 129)' : 'red',
            }}
          >
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className={classes.priceText}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
