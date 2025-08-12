import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CircularProgress, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  // Fetch historical price data
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  // Dark theme for chart
  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
          padding: 5,
          "@media (max-width: 900px)": {
            width: "100%",
            marginTop: 0,
            padding: 2,
            paddingTop: 0,
          },
        }}
      >
        {/* Show loading spinner until data is fetched */}
        {!historicData || flag === false ? (
          <CircularProgress
            sx={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            {/* Line Chart */}
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: { point: { radius: 1 } },
              }}
            />

            {/* Day selection buttons */}
            <Box
              sx={{
                display: "flex",
                marginTop: 2,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
