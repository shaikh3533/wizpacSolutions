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
import { Check, Clear, Event, Search } from "@material-ui/icons";
import { Box, Table, TableCell, TableRow } from "@mui/material";
import Fab from "@mui/material/Fab";
import { CalendarMonth, FilterAltOff } from "@mui/icons-material";


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
 

  useEffect(() => {
    console.log(gridApi, "grid");
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

  const responsiveColumns = () => {
    if (props.screenWidth < 770) {
      return null;
    } else {
      return 135;
    }
  };
  const responsiveColumnPin = () => {
    if (props.screenWidth < 770) {
      return null;
    } else {
      return "left";
    }
  };
  const detailShow = () => {
    if (props.screenWidth < 770) {
      return false;
    } else {
      return true;
    }
  };

  const columnHide = () => {
    if (props.screenWidth < 770) {
      return true;
    } else {
      return false;
    }
  };
  const sectorHide = () => {
    if (props.screenWidth > 500) {
      return false;
    } else {
      return true;
    }
  };

  function innerDissemDate(params) {
    if (params.data.Dissemination == null) {
      return "-";
    } else {
      const date = new Date(params.data.Dissemination);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function yes(params) {
    if (params.data.rw === "YES") {
      return "Yes";
    } else if (params.data.rw === "NO" || params.data.rw === "-") {
      return "-";
    }
  }

  function innerNotiDate(params) {
    if (params.data.Notification == null) {
      return "-";
    } else {
      const date = new Date(params.data.Notification);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function fullDate(params) {
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
      return <span class="loader"></span>;
      // <CircularProgress size={20} color="inherit" />
    } else {
      return params.value;
    }
  };
  const columnDefs = [
    {
      maxWidth: 30,
      field: "sNo",
      filter: true,
      menuTabs: false,
      pinned: responsiveColumnPin(),
      hide: detailShow(),
      cellRenderer: "agGroupCellRenderer",
    },
    {
      headerName: "S.No",
      maxWidth: 75,
      // minWidth: 66,
      field: "sNo",
      sortable: true,
      filter: true,
      // filter: "agSetColumnFilter",
      menuTabs: false,
      cellRenderer: cellrandered,
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Opinion",
      minWidth: responsiveColumns(),
      maxWidth: responsiveColumns(),
      field: "Entity",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
      tooltipField: "Entity",
      pinned: responsiveColumnPin(),
    },

    {
      headerName: "Sector",
      field: "Industry",
      minWidth: 130,
      hide: sectorHide(),
      maxWidth: 130,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "Industry",
      cellRenderer: cellrander,
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Rating Type",
      hide: columnHide(),
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
      hide: columnHide(),
      field: "managerName",
      minWidth: 87,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "pacraAnalyst",
      minWidth: 99,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Action",
      hide: columnHide(),
      field: "RatingAction",
      minWidth: 93,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "R|LT",
      hide: columnHide(),
      field: "RatingLT",
      minWidth: 79,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "R|ST",
      hide: columnHide(),
      field: "RatingST",
      minWidth: 81,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "RW",
      hide: columnHide(),
      field: "rw",
      // minWidth: 85,
      minWidth: 75,
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
      hide: columnHide(),
      field: "cf",
      minWidth: 75,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "O|L",
      hide: columnHide(),
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
      hide: sectorHide(),
      field: "Notification",
      minWidth: 130,
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
      headerName: "Dissemination",
      field: "Dissemination",
      minWidth: 150,
      hide: columnHide(),
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
      cellRenderer: fullDate,
    },
    {
      headerName: "PR",
      field: "pr",
      hide: columnHide(),
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      quickFilterText: "string",
      cellRenderer: (params) => {
        if (params.value) {
          return <Check style={{ size: "20 20" }}  className='theme_text' />;
        } else {
          return <Clear  className='theme_text' />;
        }
      },
    },

    {
      headerName: "RR",
      hide: columnHide(),
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
            return <Check  className='theme_text' />;
          } else {
            return <Clear  className='theme_text' />;
          }
        }
      },
    },

    {
      headerName: "H",
      hide: columnHide(),
      field: "Id",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        return (
          <NavLink
            to={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.value}`}
            target="_blank"
          >
            <Event  className='theme_text' />
          </NavLink>
        );
      },
      excelMode: "windows",
    },
    {
      headerName: "SP",
      hide: columnHide(),
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
            return <Check  className='theme_text' />;
          } else {
            return <Clear  className='theme_text' />;
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
  ];

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
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const MobViewRender = (params) => (
    <h1 style={{ padding: "20px" }}>
      <Table className="overflow-scroll">
        {props.screenWidth < 500 ? (
          <TableRow>
            <TableCell variant="head" className="fw-bolder">
              Sector
            </TableCell>
            <TableCell>{params.data.Industry}</TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            Rating Type
          </TableCell>
          <TableCell>{params.data.RatingScale}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            {" "}
            Team
          </TableCell>
          <TableCell>{params.data.managerName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            Analyst
          </TableCell>
          <TableCell>{params.data.pacraAnalyst}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            Action
          </TableCell>
          <TableCell>{params.data.RatingAction}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            R|LT
          </TableCell>
          <TableCell>{params.data.RatingLT}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            R|ST
          </TableCell>
          <TableCell>{params.data.RatingST}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            RW
          </TableCell>
          <TableCell>{yes(params)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            CF
          </TableCell>
          <TableCell>{params.data.cf}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            Outlook
          </TableCell>
          <TableCell>{params.data.Outlook}</TableCell>
        </TableRow>
        {props.screenWidth < 500 ? (
          <TableRow>
            <TableCell variant="head" className="fw-bolder">
              Notification
            </TableCell>
            <TableCell>{innerNotiDate(params)}</TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            Dissemination
          </TableCell>
          <TableCell>{innerDissemDate(params)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            PR
          </TableCell>
          <TableCell>
            {params.data.pr ? (
              <Check  className='theme_text' />
            ) : (
              <Clear  className='theme_text' />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            RR
          </TableCell>
          <TableCell>
            {params.data.sr ? (
              <Check  className='theme_text' />
            ) : (
              <Clear  className='theme_text' />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            H
          </TableCell>
          <TableCell>
            {
              <NavLink
                to={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.Id}`}
              >
                <Event  className='theme_text' />
              </NavLink>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder">
            SP
          </TableCell>
          <TableCell>
            {params.data.shl ? (
              <Check  className='theme_text' />
            ) : (
              <Clear  className='theme_text' />
            )}
          </TableCell>
        </TableRow>
      </Table>
    </h1>
  );
  const detailCellRenderer = useMemo(() => {
    return MobViewRender;
  }, []);

  const [search, setSearch] = useState(false);
  const [date, setDate] = useState(false);

  const onChangeDate = () => {
    setDate(!date);
    setSearch(false);
  };
  const onChangeSearch = () => {
    setSearch(!search);
    setDate(false);
  };
  const sidebar = () => {
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
  };

  return (
    <div style={{ containerStyle }} className="themeContainer">
      {/* <div className="row">
        <div className={`row ${isCollapsed ? null : "d-none"}`}>
          <div className="col-lg-8 col-md-6 col-6">
            <div className="row">
              <div className="col-2">
                <Button onClick={() => setisCollapsed(!isCollapsed)}>
                  {!isCollapsed ? <ExpandMore /> : <ExpandLess />}
                </Button>
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-6 d-inline-flex">
                    <p className=" theme_text me-1 my-auto d-sm-none d-lg-block"> First Date </p>
                    <p className=" theme_text me-1 my-auto d-sm-block d-lg-none"> From </p>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-2 btn_theme"
                    />
                  </div>
                  <div className="col-6 d-inline-flex">
                    <p className=" theme_text me-1 my-auto d-sm-none d-lg-block"> Last Date </p>
                    <p className=" theme_text me-1 my-auto d-sm-block d-lg-none"> To </p>
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-2 btn_theme"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-6 my-auto">
            <div className="row">
              <div className="col-8">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  onInput={onFilterTextBoxChanged}
                  id="filter-text-box"
                />
              </div>
              <div className="col-4 my-auto">
                <Button
                  variant="contained"
                  size="small"
                  className="ms-2"
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
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setisCollapsed(!isCollapsed)}
          className={!isCollapsed ? null : "d-none"}
        >
          {!isCollapsed ? <ExpandMore /> : <ExpandLess />}
        </Button>
      </div> */}
      <center>
        <Box className="p-1">
          <Fab
            color="neutral"
            aria-label="Date"
            variant="extended"
            className=" mb-1"
          >
            <CalendarMonth onClick={onChangeDate} className='theme_text' />
            <div className={`p-1 ${date ? "d-inline-flex" : "d-none"}`}>
              <div className="m-1">
                {/* <p className="theme_text me-1 my-auto"> From </p> */}
                <input
                  type="date"
                  id="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-1 btn_theme"
                  style={props.screenWidth < 400 ? { width: 125 } : null}
                />
              </div>
              <div className="m-1">
                {/* <p className="theme_text me-1 my-auto"> To </p> */}
                <input
                  type="date"
                  id="endDate"
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-1 btn_theme"
                  style={props.screenWidth < 400 ? { width: 125 } : null}
                />
              </div>
            </div>
          </Fab>
          <Fab
            color="neutral"
            aria-label="edit"
            variant="extended"
            className="ms-2 mb-1"
          >
            <Search onClick={onChangeSearch}  className='theme_text'/>
            <div className={`px-2 ${search ? "d-block" : "d-none"}`}>
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onInput={onFilterTextBoxChanged}
                id="filter-text-box"
              />
            </div>
          </Fab>
          <Fab
            color="neutral"
            variant="extended"
            className="ms-2"
            onClick={() => {
              if (gridApi) {
                for (let i in columnDefs) {
                  gridApi.api
                    .getFilterInstance(columnDefs[i].field)
                    .setModel(null);
                  gridApi.api.onFilterChanged();
                  gridRef.current.api.setQuickFilter("");
                  document.getElementById("filter-text-box").value = "";
                  if (document.getElementById("startDate").value !== "") {
                    document.getElementById("startDate").value = "";
                  }
                  if (document.getElementById("endDate").value !== "") {
                    document.getElementById("endDate").value = "";
                  }
                }
              }
            }}
          >
            <FilterAltOff sx={{ mr: 1 }}  className='theme_text' />
            Reset
          </Fab>
        </Box>
      </center>
      <div
        className="ag-theme-alpine"
        style={{ height: "75vh", width: "100%", gridStyle }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={props.Data}
          columnDefs={columnDefs}
          animateRows={true}
          suppressColumnMoveAnimation={true}
          suppressAggFuncInHeader={true}
          defaultColDef={defaultColDef}
          sideBar={props.screenWidth < 770 ? "hide" : sidebar()}
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
