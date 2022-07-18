import React from 'react'
import TableComponent from '../../Atoms/TableComponent'
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { NavLink } from "react-router-dom";
import {
  Event,
} from "@material-ui/icons";
import { Table, TableCell, TableRow } from "@mui/material";
function InProcess(props) {
  const responsiveColumns = () => {
    if (props.screenWidth < 770) {
      return null;
    } else {
      return 210;
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

  function Initiationdate(params) {
    if (params.data.Initiation == null) {
      return "-";
    } else {
      const date = new Date(params.data.Initiation);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function stage_date(params) {
    if (params.data.stage_date == null) {
      return "-";
    } else {
      const date = new Date(params.data.stage_date);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function prcdate(params) {
    if (params.data.prcdate == null) {
      return "-";
    } else {
      const date = new Date(params.data.prcdate);
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
      headerName: "",
      field: "sNo",
      maxWidth: 30,
      filter: true,
      menuTabs: false,
      pinned: responsiveColumnPin(),
      hide: detailShow(),
      cellRenderer: "agGroupCellRenderer",
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true,
    },
    {
      headerName: "#",
      maxWidth: 50,
      // minWidth: 66,
      field: "sNo",
      sortable: true,
      filter: true,
      // filter: "agSetColumnFilter",
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
      suppressFiltersToolPanel: true,
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
      tooltipField: "Entity",
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Sector",
      field: "Industry",
      minWidth: 130,
      maxWidth: 130,
      sortable: true,
      hide: sectorHide(),
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "Industry",
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
    },
    {
      headerName: "Team",
      hide: columnHide(),
      field: "managerName",
      minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "pacraAnalyst",
      minWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",

    },
    {
      headerName: "Current Review",
      hide: columnHide(),
      field: "ratingUpdateType",
      minWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
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
      excelMode: "windows",
    },
    {
      headerName: "Initiation Date",
      hide: sectorHide(),
      field: "Initiation",
      minWidth: 115,
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
      },
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
    {
      headerName: "Initiantion Days",
      hide: columnHide(),
      field: "initaldays",
      minWidth: 110,
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

    },
    {
      headerName: "Stage",
      hide: columnHide(),
      field: "stage",
      minWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Stage Date",
      hide: columnHide(),
      field: "stage_date",
      minWidth: 94,
      sortable: true,
      filter: "agDateColumnFilter",
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


    },
    {
      headerName: "Stage Days",
      hide: columnHide(),
      field: "stagedays",
      minWidth: 94,
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

    },
    {
      headerName: "Previous Date",
      hide: columnHide(),
      field: "prcdate",
      minWidth: 115,
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
      },
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
    {
      headerName: "Days Deadlines",
      hide: columnHide(),
      field: "datetodeadlinerc",
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
            <Event className='theme_text' />
          </NavLink>
        );
      },
      excelMode: "windows",
    },
  ]
  const MobViewRender = (params) => (
    <h1 style={{ padding: "10px 20px" }}>
      <Table className="overflow-scroll responsiveTableFonts">
        {props.screenWidth < 500 ? (
          <TableRow>
            <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
              Sector
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">{params.data.Industry}</TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Rating Type
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.RatingScale}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Team
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.managerName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Analyst
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.pacraAnalyst}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Current Review
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.ratingUpdateType}</TableCell>
        </TableRow>
        {props.screenWidth < 500 ? (
          <TableRow>
            <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
              Initiantion Date
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">{Initiationdate(params)}</TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Initiantion Days
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.initaldays}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Stage
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.stage}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Stage Date
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{stage_date(params)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Stage Days
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.stagedays}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Previous RC
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{prcdate(params)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Days Deadline
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.datetodeadlinerc}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            H
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {
              <NavLink
                to={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.Id}`}
              >
                <Event className='theme_text' />
              </NavLink>
            }
          </TableCell>
        </TableRow>
      </Table>
    </h1>
  );

  return (
    <TableComponent Data={props.InProcess} columnDefs={columnDefs}
      screenWidth={props.screenWidth} MobViewRender={MobViewRender} />
  )
}

export default InProcess