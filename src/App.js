import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Routes/Home";
import Ratings from "./Routes/Ratings";
import InputData from "./Routes/InputData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  containerWidth: {
    width: `calc(100% - 240px)`,
    marginTop: "72px",
    top: "72px",
  },
}));
function App() {
  const [open, setOpen] = useState(false);
  const [isResponsive, setisResponsive] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  function useWindowSize() {
    const [size, setsize] = useState([window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setsize([window.innerWidth]);
      };
      window.addEventListener("resize", handleResize);
    }, []);
    return size;
  }
  const [screenWidth] = useWindowSize();

  useEffect(() => {
    const screenWidth = window.screen.width;
    if (screenWidth < 770) {
      setisResponsive(false);
    }
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${item}`;
  }
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <SideBar
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            open={open}
          />
          <div className={`${classes.containerWidth}`} style={{ flexGrow: 1 }}>
            <Routes>
              <Route
                path="/"
                element={<Home open={open} screenWidth={screenWidth} />}
              />
              <Route path="/Ratings" element={<Ratings />} />
              <Route path="/InputData" element={<InputData />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
