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

function OpinionData(props) {

    // const Status = function (){
    //     var groupuniqueCount = props.GroupArray;
    //     var grouparray = [];
    //     var groupcount = 0;
    //     var clientuniqueCount = props.ClientArray;
    //     var clientarray = [];
    //     var clientcount = 0;
    //     var opinionuniqueCount = props.OpinionArray;
    //     var opinionarray = [];
    //     var opinioncount = 0;
    //     groupuniqueCount.forEach(function(i){
    //         grouparray[i] = (grouparray[i] || 0) + 1;
    //     })
    //     clientuniqueCount.forEach(function(i){
    //         clientarray[i] = (clientarray[i] || 0) + 1;
    //     })
    //     opinionuniqueCount.forEach(function(i){
    //         opinionarray[i] = (opinionarray[i] || 0) + 1;
    //     })

    //     for(let i in grouparray){
    //         groupcount++
    //     }
    //     for(let i in clientarray){
    //         clientcount++
    //     }
    //     for(let i in opinionarray){
    //         opinioncount++
    //     }
    //     return (
    //         <p className='mt-2 ms-1'> GroupName: {groupcount} ClientName: {clientcount} OpinionName: {opinioncount} </p>
    //      )

    // }
    // Status()
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

    const zeroGroup = (params) => {
        if (params.value === '0') {
            return ' ';
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
            // pinned: responsiveColumnPin(),
        },
        {
            headerName: `Group Name `,
            hide: columnHide(),
            field: "GroupName",
            minWidth: 94,
            sortable: true,
            filter: "agSetColumnFilter",
            excelMode: "windows",
            cellRenderer: zeroGroup,
        },
        {
            headerName: "Client Name",
            hide: columnHide(),
            field: "ClientName",
            minWidth: 85,
            sortable: true,
            filter: "agSetColumnFilter",
            excelMode: "windows",
            // pinned: responsiveColumnPin(),
        },
        {
            headerName: "Opinion Name",
            field: "OpinionName",
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
            // pinned: responsiveColumnPin(),
        },
        {
            headerName: "Team",
            // minWidth: responsiveColumns(),
            // maxWidth: responsiveColumns(),
            hide: columnHide(),
            field: "Team",
            sortable: true,
            filter: "agSetColumnFilter",
            excelMode: "windows",
            tooltipField: "Entity",
        },
        {
            headerName: "Industry",
            field: "Industry",
            minWidth: 130,
            maxWidth: 130,
            sortable: true,
            hide: columnHide(),
            filter: "agSetColumnFilter",
            excelMode: "windows",
            tooltipField: "Industry",
        },
        {
            headerName: "City",
            field: "city",
            minWidth: 130,
            maxWidth: 130,
            sortable: true,
            hide: columnHide(),
            filter: "agSetColumnFilter",
            excelMode: "windows",
            tooltipField: "City",
        },
        {
            headerName: "Stage",
            field: "stage",
            maxWidth: 75,
            sortable: true,
            filter: "agSetColumnFilter",
            excelMode: "windows",
        },
    ]
    const MobViewRender = (params) => (
        <h1 style={{ padding: "10px 20px" }}>
            <Table className="overflow-scroll responsiveTableFonts">
                {props.screenWidth < 500 ? (
                    <TableRow>
                        <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                            Opinion Name
                        </TableCell>
                        <TableCell className="responsiveTableFonts py-1">{params.data.OpinionName}</TableCell>
                    </TableRow>
                ) : null}
                <TableRow>
                    <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                        Industry
                    </TableCell>
                    <TableCell className="responsiveTableFonts py-1">{params.data.Industry}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                        City
                    </TableCell>
                    <TableCell className="responsiveTableFonts py-1">{params.data.city}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                        Team
                    </TableCell>
                    <TableCell className="responsiveTableFonts py-1">{params.data.Team}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                        Client Name
                    </TableCell>
                    <TableCell className="responsiveTableFonts py-1">{params.data.ClientName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                        Group Name
                    </TableCell>
                    <TableCell className="responsiveTableFonts py-1">{params.data.GroupName}</TableCell>
                </TableRow>
                {props.screenWidth < 500 ? (
                    <TableRow>
                        <TableCell variant="head" className="fw-bolder responsiveTableFonts py-1">
                            Stage
                        </TableCell>
                        <TableCell className="responsiveTableFonts py-1">{params.data.stage}</TableCell>
                    </TableRow>
                ) : null}
            </Table>
        </h1>
    );

    return (
        <TableComponent Data={props.OpinionData} columnDefs={columnDefs}
            screenWidth={props.screenWidth} MobViewRender={MobViewRender} statusbar = {props.status}  count = {true}
            GroupArray={props.GroupArray}
            ClientArray={props.ClientArray}
            OpinionArray={props.OpinionArray}
            setGroupArray={props.setGroupArray}
            setClientArray={props.setClientArray}
            setOpinionArray={props.setOpinionArray}
            />
    )
}

export default OpinionData