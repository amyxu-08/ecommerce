import "./App.css";
import { Box } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import Home from "./Components1/Home/Home";
import NavigationBar from "./Components1/Navigation/NavigationBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import You from "./Components1/buyfromyou/you";
import BuyFromUs from "./Components1/BuyFromUs/buyFromUs";
import ItemDisplay from "./Components1/buyfromyou/itemdisplay";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavigationBar />
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy-from-you" element={
              <>
                <ItemDisplay />
                <You />
              </>
            } />
            <Route path="/buyFromUs" element={<BuyFromUs />} />
          </Routes>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
