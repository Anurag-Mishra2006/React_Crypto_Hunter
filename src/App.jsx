import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/CoinPage';
import { makeStyles } from '@mui/styles';
import Alert from './components/Banner/Alert';

const useStyles = makeStyles(() => ({
  root: {
    background: "#14161a",
    color: "white",
    minHeight: "100vh"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
