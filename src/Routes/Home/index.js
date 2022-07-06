import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Outstanding from './Outstanding';
import InProcess from './InProcess';
import GetData from '../../API/GetData';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fab } from '@mui/material';
import { Popover } from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
const data = require("../../outstanding_data.json")



export default function Index(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [OutstandingDataArray, setOutstandingDataArray] = useState(data)
  const [InProcessDataArray, setInProcessDataArray] = useState([])
  useEffect(() => {

    GetData.OutstandingData().then(res => {
      res = res.data.data;
      for (let i in res) {
        res[i].sNo = Number(i) + 1;
      }
      setOutstandingDataArray(res)

    })
  }, [])

  // setTimeout(
  useEffect(() => {

    GetData.InProcess().then(res => {
      console.log(res, "res");
      res = res.data.data;
      for (let i in res) {
        res[i].sNo = Number(i) + 1;
      }
      setInProcessDataArray(res);
    })
  }, [])
  // }), 5000)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setValue(event.target.newValue);
  };


  return (
    <div className={classes.root}>
      {console.log(props.open)}
      {props.screenWidth > 770 ?
        (<AppBar position="fixed" className={` ${classes.topMargin} ${props.open ? classes.leftMargin : props.screenWidth < 700 ? classes.responsiveLeft : classes.left}`} color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            className='theme_text'
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Outstanding" {...a11yProps(0)} />
            <Tab label="In-Process" {...a11yProps(1)} />
            <Tab label="Deadline" {...a11yProps(2)} />
            <Tab label="UnFinished" {...a11yProps(3)} />
            <Tab label="Initial" {...a11yProps(4)} />
            <Tab label="In-MNA" {...a11yProps(5)} />
            <Tab label="In-COB" {...a11yProps(6)} />
            <Tab label="IN-RIP" {...a11yProps(7)} />
            <Tab label="Withdraw" {...a11yProps(8)} />
            <Tab label="Inst" {...a11yProps(9)} />
            <Tab label="Inst-P" {...a11yProps(10)} />
            <Tab label="Address Book" {...a11yProps(11)} />
            <Tab label="Pvt Ratings" {...a11yProps(12)} />
          </Tabs>
        </AppBar>)
        :
        (<PopupState variant="popover" popupId="demo-popup-popover"
          className={`height_TabsBar ${classes.topMargin} ${props.open ? classes.leftMargin : classes.responsiveLeft}`}>
          {(popupState) => (
            <>
              <Fab
                color="transparent"
                aria-label="edit"
                variant="extended"
                className="ms-2 fabCustom "
              >
                <MoreVertIcon  {...bindTrigger(popupState)} />
              </Fab>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  orientation="vertical"
                  indicatorColor="primary"
                  className='theme_text'
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Outstanding" {...a11yProps(0)} />
                  <Tab label="In-Process" {...a11yProps(1)} />
                  <Tab label="Deadline" {...a11yProps(2)} />
                  <Tab label="UnFinished" {...a11yProps(3)} />
                  <Tab label="Initial" {...a11yProps(4)} />
                  <Tab label="In-MNA" {...a11yProps(5)} />
                  <Tab label="In-COB" {...a11yProps(6)} />
                  <Tab label="IN-RIP" {...a11yProps(7)} />
                  <Tab label="Withdraw" {...a11yProps(8)} />
                  <Tab label="Inst" {...a11yProps(9)} />
                  <Tab label="Inst-P" {...a11yProps(10)} />
                  <Tab label="Address Book" {...a11yProps(11)} />
                  <Tab label="Pvt Ratings" {...a11yProps(12)} />
                </Tabs>
              </Popover>
            </>
          )}
        </PopupState>)
      }
      {/* <div className='container'> */}
      <TabPanel value={value} index={0}>
        <Outstanding Outstanding={OutstandingDataArray} screenWidth={props.screenWidth} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InProcess InProcess={InProcessDataArray} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Deadline
      </TabPanel>
      <TabPanel value={value} index={3}>
        UnFinished
      </TabPanel>
      <TabPanel value={value} index={4}>
        Initial
      </TabPanel>
      <TabPanel value={value} index={5}>
        In-MNA
      </TabPanel>
      <TabPanel value={value} index={6}>
        In-COB
      </TabPanel>
      <TabPanel value={value} index={7}>
        IN-RIP
      </TabPanel>
      <TabPanel value={value} index={8}>
        Withdraw
      </TabPanel>
      <TabPanel value={value} index={9}>
        Inst
      </TabPanel>
      <TabPanel value={value} index={10}>
        Inst-P
      </TabPanel>
      <TabPanel value={value} index={11}>
        Address Book
      </TabPanel>
      <TabPanel value={value} index={12}>
        Pvt Ratings
      </TabPanel>
      {/* </div> */}
    </div >
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      className={`card ${props.screenWidth > 770 ? 'mt-4' : 'negative_margin'}`}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  topMargin: {
    top: '50px',
  },
  leftMargin: {
    width: `calc(100% - ${240}px)`,
  },
  left: {
    width: `calc(100% - ${74}px)`,
  },
  responsiveLeft: {
    width: '100%',
  }
}));

