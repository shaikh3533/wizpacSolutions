import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Skeleton from '@mui/material/Skeleton';
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry, setRowData } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { NavLink } from "react-router-dom";
import "ag-grid-enterprise";
import './TableComponent.css'
import { Check, Clear, Event, ExpandLess, ExpandMore, Link, Search } from "@material-ui/icons";
import { Button, InputBase, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: (theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: (theme.palette.common.white, 0.25),
    // },
    // marginLeft: theme.spacing(2),
    // marginRight: 0,
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginRight: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    color: '#204162',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#204162',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    color: '#204162',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

export default function Table(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log('TableCOmProps', props.Data);
    setrowData(props.Data);
    if (gridApi) {
      var dateFilterComponent = gridApi.api.getFilterInstance("Notification");
      dateFilterComponent.setModel({
        type: getFilterType(),
        inRange: true,
        dateFrom: startDate,
        dateTo: endDate,
      });
      gridApi.api.onFilterChanged();
    }
  }, [startDate, endDate]);

  const onGridReady = useCallback((params) => {
    setGridApi(params);
  }, []);


  const initialload = function () {
    var initdata = []
    for (let i = 0; i <= 15; i++) {
      initdata.push({
        "recordid": "empty",
        "Id": "empty",
        "Notification": "empty",
        "Dissemination": "empty",
        "ratingTypeId": "empty",
        "Entity": "empty",
        "newhistory": "empty",
        "shl": "empty",
        "Industry": "empty",
        "title": "empty",
        "sr": "empty",
        "RatingAction": "empty",
        "Outlook": "empty",
        "RatingST": "empty",
        "RatingLT": "empty",
        "RatingScale": "empty",
        "analyst": "empty",
        "ratingUpdateType": "empty",
        "pacraAnalyst": "empty",
        "user_id2": "empty",
        "lead_rc_id": "empty",
        "leadRcName": "empty",
        "managerName": "empty",
        "user_id3": "empty",
        "user_id1": "empty",
        "rw": "empty",
        "cf": "empty",
        "sNo": "empty",
        "pr": "empty"
      })
    }
    return initdata;
  }
  const gridRef = useRef();
  const [rowData, setrowData] = useState(initialload());
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  function fullDate(params) {
    if (params.value === "empty") {
      return <Skeleton variant="rectangular" width={120} height={18} style={{ marginTop: '3px' }} />
    }
    else {
      if (params.value == null) {
        return "-"
      }
      else {

        const date = new Date(params.value);
        const yyyy = date.getFullYear();
        const yy = yyyy.toString();
        const y = yy.slice(2, 4);
        let mm = date.toLocaleString("default", { month: "short" });
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        return dd + "-" + mm + "-" + y;
      }
    }
  }
  const cellrander = (params) => {
    if (params.value === "empty") {
      return <Skeleton variant="rectangular" width='auto' height={18} style={{ marginTop: '3px' }} />
    }
    else {
      return params.value
    }
  }
  const [columnDefs, setColumnData] = useState([
    {
      headerName: "S.No",
      maxWidth: 75,
      field: "sNo",
      sortable: true,
      filter: "agSetColumnFilter",
      menuTabs: false,
      cellRenderer: cellrander,

    },
    {
      headerName: "Opinion",
      // minWidth: 85,
      field: "Entity",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "Sector",
      field: "Industry",
      // minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "Rating Type",
      field: "RatingScale",
      // minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "Team",
      field: "managerName",
      // minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "Analyst",
      field: "pacraAnalyst",
      // minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "Action",
      field: "RatingAction",
      // minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "R|LT",
      field: "RatingLT",
      // minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "R|ST",
      field: "RatingST",
      // minWidth: 85,
      maxWidth: 80,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "RW",
      field: "rw",
      // minWidth: 85,
      maxWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "CF",
      field: "cf",
      // minWidth: 85,
      maxWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      field: "Outlook",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "Notification",
      // hide: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      excelMode: "windows",
      cellRenderer: fullDate,
      debounceMs: "DateFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
        inRangeInclusive: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = moment(cellValue).format("DD/MM/YYYY");
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        buttons: ["clear", "reset", "apply"],
      },
    },

    {
      field: "Dissemination",
      // hide: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      excelMode: "windows",
      debounceMs: "DateFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
        inRangeInclusive: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = moment(cellValue).format("DD/MM/YYYY");
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        buttons: ["clear", "reset", "apply"],
      },
      cellRenderer: fullDate,
    },
    {
      field: "pr",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      quickFilterText: "string",
      cellRenderer: (params) => {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={120} height={18} style={{ marginTop: '3px' }} />
        }
        else {

          if (params.value) {
            return <Check color='primary' />;
          } else {
            return <Clear color='primary' />;
          }
        }
      },
    },

    {
      headerName: 'RR',
      field: "sr",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: (params) => {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={210} height={118} style={{ marginTop: '3px' }} />
        }
        else {

          if (params.value) {
            return <Check color='primary' />;
          } else {
            return <Clear color='primary' />;
          }
        }
      },
    },

    {
      headerName: "H",
      field: "Id",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={210} height={118} style={{ marginTop: '3px' }} />
        }
        else {

          return (
            <NavLink to={`/${params.value}`}>
              <Event color='primary' />
            </NavLink>
          );
        }
      },
      excelMode: "windows",
    },
    {
      headerName: "SP",
      field: "shl",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: (params) => {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={210} height={118} style={{ marginTop: '3px' }} />
        }
        else {

          if (params.value) {
            return <Check color='primary' />;
          } else {
            return <Clear color='primary' />;
          }
        }
      },
      excelMode: "windows",
    },
    {
      field: "recordid",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      filterParams: { buttons: ["reset"] },
      cellRenderer: cellrander
    },

    {
      field: "ratingTypeId",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "title",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "analyst",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "ratingUpdateType",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "user_id2",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "lead_rc_id",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "leadRcName",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "user_id3",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "user_id1",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
  ]);


  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 70,
      resizable: true,
      menuTabs: ['filterMenuTab', 'generalMenuTab'],
    };
  }, []);

  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") {
      return "inRange";
    }
    // else if(startDate !== ""){
    //   return ("Equal" || "greaterThan");
    // }
    // else if(endDate !==""){
    //   return "lessThan";
    // }
  };

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        }
      ],
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const [isCollapsed, setisCollapsed] = useState(true)

  return (
    <div style={{ containerStyle }} className='themeContainer'>
      <Button onClick={() => setisCollapsed(!isCollapsed)}>
        {!isCollapsed ?
          <ExpandMore /> : <ExpandLess />
        }
      </Button>
      {/* <div className={`row my-auto p-2 ${isCollapsed? null : 'd-none'}`}>
        <div className="col-md-6 col-lg-4 my-auto">
          <div className="row my-auto g-3">
            <input type="date" className="col-md-6 btn_theme my-1 p-2" onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" className="col-md-6 btn_theme my-1 p-2" onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6 col-lg-4 my-auto">
          <button className="btn theme_text btn_theme" onClick={() => {
            if (gridApi) {
              for (let i in columnDefs) {
                console.log(columnDefs[i].field);
                gridApi.api.getFilterInstance(columnDefs[i].field).setModel(null);
                gridApi.api.onFilterChanged();
              }
            }
          }}>Reset Filters</button>
        </div>
        <div className="col-md-6 col-lg-4 my-auto">
          <div className={`ms-auto ${classes.search}`}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Filter..."
              id="filter-text-box"
              className={`${classes.inputRoot} ${classes.inputInput}`}
              onInput={onFilterTextBoxChanged}
            />
          </div>
        </div>
      </div> */}

      <div className="d-flex w-100 p-3">
        <div className='ms-0'>
          From: <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          To: <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <Button variant="contained" size="small"
          onClick={() => {
            if (gridApi) {
              for (let i in columnDefs) {
                console.log(columnDefs[i].field);
                gridApi.api.getFilterInstance(columnDefs[i].field).setModel(null);
                gridApi.api.onFilterChanged();
              }
            }
          }}>Reset Filters</Button>
        <div className={`ms-auto ${classes.search}`}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Filter..."
            id="filter-text-box"
            className={`${classes.inputRoot} ${classes.inputInput}`}
            onInput={onFilterTextBoxChanged}
          />
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "75vh", width: "100%", gridStyle }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          // overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'}
          // overlayNoRowsTemplate={'<span class="ag-overlay-loading-center"><i className="fas fa-hourglass-half" style="color: blue; height: 0%"> Please wait while your data are loading </i> </span>'}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}