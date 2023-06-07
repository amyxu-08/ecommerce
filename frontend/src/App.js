import "./App.css";
import { Box } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import Home from "./Components1/Home/Home";
import Payment from "./Components1/Payment/Payment";
import Completion from "./Components1/Payment/Completion";
import NavigationBar from "./Components1/Navigation/NavigationBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BuyFromUs from "./Components1/BuyFromUs/buyFromUs";
const theme = createTheme({
  palette: {
    primary: {
      main: "#297F61",
    },
    secondary: {
      main: "#29727F",
    },
    button: {
      primary: "#297F61",
      secondary: "#F5F6F4",
    },
    accent: {
      main: "#29727F",
    },
  },
});
export const routes = {
  buyFromUs: "/buyFromUs",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavigationBar />
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/completion" element={<Completion />} />

            <Route path={routes.buyFromUs} element={<BuyFromUs />} />
          </Routes>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
