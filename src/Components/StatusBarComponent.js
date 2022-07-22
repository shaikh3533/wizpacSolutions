import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import GetData from "../API/GetData";

export default function StatusBarComponent(props) {
  const [GroupArray, setGroupArray] = useState([]);
  const [ClientArray, setClientArray] = useState([]);
  const [OpinionArray, setOpinionArray] = useState([]);
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
    GetData.OpinionData().then((res) => {
      res = res.data.data;
      var GroupNameArray = [];
      var ClientNameArray = [];
      var OpinionNameArray = [];
      for (let i in res) {
        if (res[i].GroupName && res[i].GroupName !== "0") {
          GroupNameArray.push(res[i].GroupName);
        }
        if (res[i].ClientName) {
          ClientNameArray.push(res[i].ClientName);
        }

        if (res[i].OpinionName) {
          OpinionNameArray.push(res[i].OpinionName);
        }
      }
      setGroupArray(GroupNameArray);
      setClientArray(ClientNameArray);
      setOpinionArray(OpinionNameArray);
    });
  }, []);
  const Status = function () {
    var groupuniqueCount = GroupArray;
    var grouparray = [];
    var groupcount = 0;
    var clientuniqueCount = ClientArray;
    var clientarray = [];
    var clientcount = 0;
    var opinionuniqueCount = OpinionArray;
    var opinionarray = [];
    var opinioncount = 0;
    groupuniqueCount.forEach(function (i) {
      grouparray[i] = (grouparray[i] || 0) + 1;
    });
    clientuniqueCount.forEach(function (i) {
      clientarray[i] = (clientarray[i] || 0) + 1;
    });
    opinionuniqueCount.forEach(function (i) {
      opinionarray[i] = (opinionarray[i] || 0) + 1;
    });

    for (let i in grouparray) {
      groupcount++;
    }
    for (let i in clientarray) {
      clientcount++;
    }
    for (let i in opinionarray) {
      opinioncount++;
    }
    if (screenWidth > 770) {
      return (
        <>
          {groupcount !== 0 ? (
            <div className="ag-status-name-value">
              Group Name:
              <span className="ag-status-name-value-value marginRight">
                {groupcount}
              </span>
              Client Name:
              <span className="ag-status-name-value-value marginRight">
                {clientcount}
              </span>
              Opinion Name:
              <span className="ag-status-name-value-value">{opinioncount}</span>
            </div>
          ) : (
            <div className="ag-status-name-value d-inline-flex">
              <Skeleton width={100} height={25} sx={{mr: 5}} />
              <Skeleton width={100} height={25} sx={{mr: 5}} />
              <Skeleton width={100} height={25} />
            </div>
          )}
        </>
      );
    } else {
      return (
        <div className="ag-status-name-value">
          <span className="ag-status-name-value-value gridvalue2">
            {opinioncount !== 0 ? (
              <>Opinion Name:{opinioncount}</>
            ) : (
              <span class="loader"></span>
            )}
          </span>
        </div>
      );
    }
  };

  return Status();
}
