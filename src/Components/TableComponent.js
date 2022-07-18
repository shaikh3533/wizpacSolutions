import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import "ag-grid-enterprise";
import "./TableComponent.css";
import {
  Clear,
  Search,
} from "@material-ui/icons";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import { CalendarMonth, FilterAlt, FilterAltOff } from "@mui/icons-material";


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
  const [counts, setCounts] = useState(" ");

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
      var dateFilterComponent1 = gridApi.api.getFilterInstance("Dissemination");
      dateFilterComponent1.setModel({
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
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const detailCellRenderer = useMemo(() => {
    return props.MobViewRender;
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
  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agTotalRowCountComponent', align: 'center' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
  }, []);
  const sidebar = () => {
    if (filterstate == true) {
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
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
            },
          },
        ],
        defaultToolPanel: "filters",
      };
    } else {
      return "hide";
    }
  };
  const [filterstate, setfilterState] = useState(false);
  const filterview = () => {
    setfilterState(!filterstate);
  };
  const mobileSidebar = () => {
    if (filterstate == true) {
      return {
        toolPanels: [
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
        ],
        defaultToolPanel: "filters",
      };
    } else {
      return "hide";
    }
  };

  return (
    <div style={{ containerStyle }} className="themeContainer">
      <Box className="p-1 mt-1 my-md-0 filterTabs text-end text-md-center">
        {props.datefilter ? <>
          <Fab
            color="transparent"
            aria-label="Date"
            variant="extended"
            className="fabCustom mb-1"
          >
            {date ?
              <Clear onClick={onChangeDate} className="theme_text" />
              :
              <CalendarMonth onClick={onChangeDate} className="theme_text" />
            }
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
        </> :
          null}
        <Fab
          color="neutral"
          aria-label="edit"
          variant="extended"
          className="ms-2 fabCustom mb-1"
        >
          {search ?
            <Clear onClick={onChangeSearch} className="theme_text" />
            :
            <Search onClick={onChangeSearch} className='theme_text' />
          }
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
          className="ms-2 fabCustom hover"
          onClick={filterview}
        >
          <FilterAlt sx={{ mr: 1 }} className="theme_text" />
          <div className="onHover"> More Filters</div>
        </Fab>
        <Fab
          color="neutral"
          variant="extended"
          className="ms-2 fabCustom hover"
          onClick={() => {
            if (gridApi) {
              for (let i in props.columnDefs) {
                gridApi.api
                  .getFilterInstance(props.columnDefs[i].field)
                  .setModel(null);
                gridApi.api.onFilterChanged();
                gridRef.current.api.setQuickFilter("");
                document.getElementById("filter-text-box").value = "";
              }
            }
          }}
        >
          <FilterAltOff sx={{ mr: 1 }} className="theme_text" />
          <div className="onHover">Reset</div>
        </Fab>
      </Box>
      {/* {props.screenWidth < 770 ? (
          <div>
            <button onClick={filterview}>Filter</button>
          </div>
        ) : null} */}
      <div
        className={`ag-theme-alpine ${props.screenWidth > 770 ? 'height_' : 'heightresponsive'}`}
        style={{ width: "100%", gridStyle }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={props.Data}
          columnDefs={props.columnDefs}
          animateRows={true}
          suppressColumnMoveAnimation={true}
          suppressAggFuncInHeader={true}
          defaultColDef={defaultColDef}
          sideBar={props.screenWidth < 770 ? mobileSidebar() : sidebar()}
          masterDetail={true}
          detailCellRenderer={detailCellRenderer}
          statusBar={statusBar}
          // onFirstDataRendered={headerHeightSetter}
          // onColumnResized={headerHeightSetter}
          // overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'}
          // overlayNoRowsTemplate={'<span class="ag-overlay-loading-center"><i className="fas fa-hourglass-half" style="color: blue; height: 0%"> Please wait while your data are loading </i> </span>'}
          onGridReady={onGridReady}


        />
      </div>
    </div >
  );
}
