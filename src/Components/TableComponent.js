import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { NavLink } from "react-router-dom";
import "ag-grid-enterprise";
import "./TableComponent.css";
import {
  Check,
  Clear,
  Event,
  ExpandLess,
  ExpandMore,
  Link,
  Search,
} from "@material-ui/icons";
import { Button, InputBase, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: (theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: (theme.palette.common.white, 0.25),
    // },
    // marginLeft: theme.spacing(2),
    // marginRight: 0,
    width: "100%",
    // [theme.breakpoints.up('sm')]: {
    //   marginRight: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    color: "#204162",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#204162",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    color: "#204162",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

export default function TableComponent(props) {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function fullDate(params) {
    if (params.value === "empty") {
      return (
        <Skeleton
          variant="rectangular"
          width={120}
          height={18}
          style={{ marginTop: "3px" }}
        />
      );
    } else {
      if (params.value == null) {
        return "-";
      } else {
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
      return (
        <Skeleton
          variant="rectangular"
          width="auto"
          height={18}
          style={{ marginTop: "3px" }}
        />
      );
    } else {
      return params.value;
    }
  };
  const cellrandered = (params) => {
    if (params.value === "empty") {
      return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
    } else {
      return params.value;
    }
  };
  const [columnDefs, setColumnData] = useState([
    {
      headerName: "",
      maxWidth: 30,
      field: "sNo",
      pinned: "left",
      cellRenderer: 'agGroupCellRenderer',
    },
    {
      headerName: "S.No",
      maxWidth: 75,
      // minWidth: 66,
      field: "sNo",
      sortable: true,
      // filter: "agSetColumnFilter",
      menuTabs: false,
      cellRenderer: cellrandered,
      pinned: "left",
    },
    {
      headerName: "Opinion",
      minWidth: 170,
      maxWidth: 170,
      field: "Entity",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
      tooltipField: "Entity",
      pinned: "left",
    },

    {
      headerName: "Sector",
      field: "Industry",
      minWidth: 130,
      maxWidth: 130,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "Industry",
      cellRenderer: cellrander,
      pinned: "left",
    },
    {
      headerName: "Rating Type",
      field: "RatingScale",
      minWidth: 100,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
      cellRenderer: cellrander,
    },
    {
      headerName: "Team",
      field: "managerName",
      minWidth: 87,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Analyst",
      field: "pacraAnalyst",
      minWidth: 99,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Action",
      field: "RatingAction",
      minWidth: 93,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "R|LT",
      field: "RatingLT",
      minWidth: 79,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "R|ST",
      field: "RatingST",
      minWidth: 81,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "RW",
      field: "rw",
      // minWidth: 85,
      minWidth: 74,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: (params) => {
        if (params.value === "YES") {
          return "Yes";
        } else if (params.value === "NO" || params.value === "-") {
          return "-";
        }
      },
    },

    {
      headerName: "CF",
      field: "cf",
      minWidth: 75,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "O|L",
      field: "Outlook",
      minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      tooltipField: "Outlook",
      headerTooltip: "Outlook",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Notification",
      field: "Notification",
      // hide: true,
      sortable: true,
      filter: "agDateColumnFilter",
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
        headerComponentParams: {
          template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
            '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
            '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
            '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
            '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
            '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
            "  </div>" +
            "</div>",
        },
      },
    },

    {
      field: "Dissemination",
      // hide: true,
      sortable: true,
      filter: "agDateColumnFilter",
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
        if (params.value) {
          return <Check color="primary" />;
        } else {
          return <Clear color="primary" />;
        }
      },
    },

    {
      headerName: "RR",
      field: "sr",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: (params) => {
        if (params.value === "empty") {
          return (
            <Skeleton
              variant="rectangular"
              width={210}
              height={118}
              style={{ marginTop: "3px" }}
            />
          );
        } else {
          if (params.value) {
            return <Check color="primary" />;
          } else {
            return <Clear color="primary" />;
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
        return (
          <NavLink to={`/${params.value}`}>
            <Event color="primary" />
          </NavLink>
        );
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
          return (
            <Skeleton
              variant="rectangular"
              width={210}
              height={118}
              style={{ marginTop: "3px" }}
            />
          );
        } else {
          if (params.value) {
            return <Check color="primary" />;
          } else {
            return <Clear color="primary" />;
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
      cellRenderer: cellrander,
    },

    {
      field: "ratingTypeId",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "title",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "analyst",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "ratingUpdateType",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "user_id2",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "lead_rc_id",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "leadRcName",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "user_id3",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      field: "user_id1",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
  ]);

  useEffect(() => {
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

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 70,
      resizable: true,
      menuTabs: ["filterMenuTab", "generalMenuTab"],
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
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
      ],
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const [isCollapsed, setisCollapsed] = useState(true);

  const headerHeightSetter = () => {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    gridApi.setHeaderHeight(height);
    gridApi.resetRowHeights();
  };
  const DetailCellRenderer = (params) => (
    <h1 style={{ padding: "20px" }}>
      <Table className="overflow-scroll">
        <TableRow>
          <TableCell variant="head">Rating Type</TableCell>
          <TableCell>{params.data.RatingScale}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head"> Team</TableCell>
          <TableCell>{params.data.managerName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Analyst</TableCell>
          <TableCell>{params.data.pacraAnalyst}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Action</TableCell>
          <TableCell>{params.data.RatingAction}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">R|LT</TableCell>
          <TableCell>{params.data.RatingLT}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">R|ST</TableCell>
          <TableCell>{params.data.RatingST}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">RW</TableCell>
          <TableCell>{params.data.rw}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">CF</TableCell>
          <TableCell>{params.data.cf}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Outlook</TableCell>
          <TableCell>{params.data.Outlook}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Notification</TableCell>
          <TableCell>{params.data.Notification}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Dissemination</TableCell>
          <TableCell>{params.data.Dissemination}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">pr</TableCell>
          <TableCell>
            {params.data.pr ? (
              <Check color="primary" />
            ) : (
              <Clear color="primary" />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">RR</TableCell>
          <TableCell>
            {params.data.sr ? (
              <Check color="primary" />
            ) : (
              <Clear color="primary" />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">H</TableCell>
          <TableCell>
            {
              <NavLink to={`/${params.data.Id}`}>
                <Event color="primary" />
              </NavLink>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">SP</TableCell>
          <TableCell>
            {params.data.shl ? (
              <Check color="primary" />
            ) : (
              <Clear color="primary" />
            )}
          </TableCell>
        </TableRow>
      </Table>
    </h1>
  );
  const detailCellRenderer = useMemo(() => {
    return DetailCellRenderer;
  }, []);

  return (
    <div style={{ containerStyle }} className="themeContainer">
      <Button onClick={() => setisCollapsed(!isCollapsed)}>
        {!isCollapsed ? <ExpandMore /> : <ExpandLess />}
      </Button>
      <div className={`row gy-3 my-auto p-2 ${isCollapsed ? null : "d-none"}`}>
        <div className="col-md-6 col-lg-4 my-auto">
          <TextField
            id="filter-text-box"
            label="Search..."
            variant="outlined"
            size="small"
            // className="btn_theme"
            type="search"
            onInput={onFilterTextBoxChanged}
          />
        </div>
        <div className="col-md-6 col-lg-4 my-auto">
          <div className="d-flex w-100">
            <button
              className="btn theme_text btn_theme ms-md-auto ms-sm-0 mx-lg-auto"
              onClick={() => {
                if (gridApi) {
                  for (let i in columnDefs) {
                    console.log(columnDefs[i].field);
                    gridApi.api
                      .getFilterInstance(columnDefs[i].field)
                      .setModel(null);
                    gridApi.api.onFilterChanged();
                  }
                }
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 my-auto">
          <div className="row my-auto g-3">
            <div className="col-md-6 my-1 d-inline-flex">
              <p className="my-auto text-white me-1"> From: </p>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className=" p-2 btn_theme"
              />
            </div>
            <div className="col-md-6 my-1 d-inline-flex">
              <p className="my-auto text-white ms-2 me-3"> To: </p>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className=" p-2 btn_theme"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "75vh", width: "100%", gridStyle }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={props.Data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          masterDetail={true}
          detailCellRenderer={detailCellRenderer}
          // onFirstDataRendered={headerHeightSetter}
          // onColumnResized={headerHeightSetter}
          // overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'}
          // overlayNoRowsTemplate={'<span class="ag-overlay-loading-center"><i className="fas fa-hourglass-half" style="color: blue; height: 0%"> Please wait while your data are loading </i> </span>'}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}
function headerHeightGetter() {
  var columnHeaderTexts = [
    ...document.querySelectorAll(".ag-header-cell-text"),
  ];
  var clientHeights = columnHeaderTexts.map(
    (headerText) => headerText.clientHeight
  );
  var tallestHeaderTextHeight = Math.max(...clientHeights);

  return tallestHeaderTextHeight;
}
