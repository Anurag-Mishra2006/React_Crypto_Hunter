import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../utils/numberWithCommas";
import Pagination from "@mui/material/Pagination";

const CoinsTable = () => {
  
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ margin: 2, fontFamily: "Montserrat", fontWeight: "bold" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          sx={{ marginBottom: 3, width: "100%" }}
          label="Search For a Crypto Currency..."
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.name}
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#131111" },
                        }}
                      >
                        {/* Coin Column */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            width="50"
                            height="50"
                            style={{ marginRight: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{ color: "darkgrey", fontSize: 14 }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        {/* Price */}
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        {/* 24h Change */}
                        <TableCell
                          align="right"
                          sx={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        {/* Market Cap */}
                        <TableCell align="right">
                          {symbol} {row.market_cap.toLocaleString().slice(0, -6)}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          }}
          count={Math.ceil(handleSearch()?.length / 10)}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0,450);
        }}
        
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
