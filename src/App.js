import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/Atoms/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Routs/Home";
import Ratings from "./Components/Routs/Ratings";
import Login from "./Components/Routs/Login";
import InputData from "./Components/Routs/InputData";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import RequireLogin from "./Components/Atoms/RequireLogin";


const useStyles = makeStyles((theme) => ({
  containerWidth: {
    width: `calc(100% - 240px)`,
    marginTop: "142px",
    top: "72px",
  },
  containerWidthResponsive: {
    width: `calc(100% - 240px)`,
    marginTop: "52px",
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


  function checkLogin() {
    const [isLoggedin, setisLoggedin] = useState(true);
    useEffect(() => {
      if (localStorage.getItem('token')) {
        setisLoggedin(false)
      }
      else setisLoggedin(true)
    }, [isLoggedin]);
    return isLoggedin;
  }

  const loginState = checkLogin();

  useEffect(() => {
    const screenWidth = window.screen.width;
    if (screenWidth < 770) {
      setisResponsive(false);
    }
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [loginParams, setloginParams] = useState({
    user_id: "",
    user_password: ""
  })

  const handleFormChange = (event) => {
    let loginParamsNew = { ...loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    setloginParams(loginParamsNew);
  };

  const login = (event) => {
    let user_id = loginParams.user_id;
    let user_password = loginParams.user_password;
    if (user_id === "admin" && user_password === "123") {
      localStorage.setItem("token", "T");
      loginState = true
    }
    // else alert('wrong Password')
    event.preventDefault();
  };


  // if (typeof window !== "undefined") {
  //   const item = localStorage.getItem("token");

  //   axios.defaults.headers.common["Authorization"] = `Bearer ${item}`;
  // }
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>

        {console.log(loginState, 'loggedIn')}
        {localStorage.getItem('token') == null ?
          <Routes >
            <Route path="/" replace element={<Login
              login={login}
              handleFormChange={handleFormChange}
            />
            }
            />
          </Routes>
          :
          <div style={{ display: "flex" }}>
            <SideBar
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              open={open}
              loginState={loginState}
            />
            <div className={`${screenWidth > 770 ? classes.containerWidth : classes.containerWidthResponsive}`} style={{ flexGrow: 1 }}>
              <Routes>
                <Route
                  path="/" replace
                  element={<Home open={open} screenWidth={screenWidth} />}
                />
                <Route path="/Ratings" element={<Ratings />} />
                <Route path="/InputData" element={<InputData />} />
              </Routes>
            </div>
          </div>
        }
      </BrowserRouter>
    </>
  );
}

export default App;