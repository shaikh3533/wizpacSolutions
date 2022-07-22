import React from "react";
import TableComponent from '../../Atoms/TableComponent'
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { NavLink } from "react-router-dom";
import {
  Check,
  Clear,
  Event,
} from "@material-ui/icons";
import { Table, TableCell, TableRow } from "@mui/material";


function Outstanding(props) {

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
  const outstandingdatefilters = (startDate, endDate, gridApi, getFilterType)=>{

    var dateFilterComponent = gridApi.api.getFilterInstance("Notification");
      dateFilterComponent.setModel({
        type: getFilterType(),
        inRange: true,
        dateFrom: startDate,
        dateTo: endDate,
      });
      var dateFilterComponent1 = gridApi.api.getFilterInstance("Dissemination");
      dateFilterComponent1.setModel({
        type: getFilterType(),
        inRange: true,
        dateFrom: startDate,
        dateTo: endDate,
      });


  }

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
      minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "pacraAnalyst",
      minWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Action",
      hide: columnHide(),
      field: "RatingAction",
      minWidth: 90,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "R|LT",
      hide: columnHide(),
      field: "RatingLT",
      minWidth: 73,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "R|ST",
      hide: columnHide(),
      field: "RatingST",
      minWidth: 74,
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
      minWidth: 65,
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
      minWidth: 65,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },
    {
      headerName: "Outlook",
      hide: columnHide(),
      field: "Outlook",
      minWidth: 100,
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
      minWidth: 125,
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
          return <Check style={{ size: "20 20" }} className='theme_text' />;
        } else {
          return <Clear className='theme_text' />;
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
            return <Check className='theme_text' />;
          } else {
            return <Clear className='theme_text' />;
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
            <Event className='theme_text' />
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
            return <Check className='theme_text' />;
          } else {
            return <Clear className='theme_text' />;
          }
        }
      },
      excelMode: "windows",
    },
  ];
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
            {" "}
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
            Action
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.RatingAction}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            R|LT
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.RatingLT}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            R|ST
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.RatingST}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            RW
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{yes(params)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            CF
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.cf}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Outlook
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{params.data.Outlook}</TableCell>
        </TableRow>
        {props.screenWidth < 500 ? (
          <TableRow>
            <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
              Notification
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">{innerNotiDate(params)}</TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            Dissemination
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">{innerDissemDate(params)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            PR
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.pr ? (
              <Check className='theme_text' />
            ) : (
              <Clear className='theme_text' />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            RR
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.sr ? (
              <Check className='theme_text' />
            ) : (
              <Clear className='theme_text' />
            )}
          </TableCell>
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
        <TableRow>
          <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
            SP
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.shl ? (
              <Check className='theme_text' />
            ) : (
              <Clear className='theme_text' />
            )}
          </TableCell>
        </TableRow>
      </Table>
    </h1>
  );

  return (
    <>
      <TableComponent Data={props.Outstanding} screenWidth={props.screenWidth}
        MobViewRender={MobViewRender} columnDefs={columnDefs} datefilters = {outstandingdatefilters} datefilter={true} />
    </>
  )
}

export default Outstanding