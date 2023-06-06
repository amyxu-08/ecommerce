import "./App.css";
import { Box } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import Home from "./Components1/Home/Home";
import NavigationBar from "./Components1/Navigation/NavigationBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#070807",
    },
    secondary: {
      main: "#FFFFFF",
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
          </Routes>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
