/* eslint-disable no-alert */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, CellClickedEvent, ICellRendererParams } from 'ag-grid-community';

// Adjusting RowData type to match the Olympic data structure
type RowData = {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

const urlMap = {
  rowData: 'https://www.ag-grid.com/example-assets/row-data.json',
  olympic: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
};

interface SimpleCompProps extends ICellRendererParams {
  buttonText: string;
}

// Simplified SimpleComp for demonstration
const SimpleComp: React.FC<SimpleCompProps> = ({ value, buttonText = '@' }) => {
  // eslint-disable-next-line no-alert
  const onAt = () => window.alert(`At ${value}`);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button type="button" onClick={onAt}>
        {buttonText}
      </button>
      <span>{value}</span>
    </div>
  );
};

const PushComp: React.FC<ICellRendererParams> = ({ value }) => {
  const onAt = () => window.alert(`At ${value}`);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button type="button" onClick={onAt}>
        Push
      </button>
      <span>{value}</span>
    </div>
  );
};

// Custom cell renderer function for the "country" field
const countryCellRenderer: ColDef['cellRenderer'] = (params: ICellRendererParams) => (
  <div>
    <b>Country:</b> {params.value}
  </div>
);

const PullComp: React.FC<ICellRendererParams> = ({ value }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button type="button" onClick={() => window.alert('Pull')}>
        Pull
      </button>
      {value}
    </div>
  );
};

// Adjusted cellRendererSelector to always return a value
const yearRendererSelector = (
  p: ICellRendererParams
): { component?: React.FC<ICellRendererParams>; params?: Record<string, unknown> } | undefined => {
  // Return type changed to | undefined
  if (p.value === 2000) return { component: PushComp, params: {} };
  if (p.value === 2004) return { component: PullComp };
  return undefined; // Return undefined instead of null
};

// const columnDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];
// N.B: filed or columnName will be remain same, so it could be initialized outside useMemo(() => ({....}), []);
const columnDefs: ColDef[] = [
  // Using cellRenderer to render a React component for this `Athlete colum or field`
  // N.B: if a field or colum needed be rendered by each field the put it within `defaultColDef`
  {
    field: 'athlete',
    cellRenderer: SimpleComp,
    // Pass additional props like buttonText through cellRendererParams
    cellRendererParams: {
      buttonText: '$', // This is how to pass a custom button's text
    },
  },
  {
    field: 'age',
    cellRenderer: SimpleComp,
    cellRendererParams: {
      buttonText: '#',
    },
  },
  { field: 'country', cellRenderer: countryCellRenderer },
  {
    field: 'year',
    cellRendererSelector: yearRendererSelector,
  },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const App: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    fetch(urlMap.olympic)
      .then((result) => result.json())
      .then((rData) => setRowData(rData));
  }, []);

  const cellClickedListener = (event: CellClickedEvent) => {
    // eslint-disable-next-line no-console
    console.log('cellClicked', event);
  };

  const pushMeClicked = () => {
    gridRef.current?.api.deselectAll();
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <button type="button" onClick={pushMeClicked}>
        Push me
      </button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
        animateRows
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default App;

/*

setSelected: highlight a row manually
selectRow: select a row 
selectAll: select multiple rows at the current viewport
forEachNode:  iterate on each row (no virtualization)
getRenderedNodes: only render rows i.e. at the current viewport
forEachNodeAfterFiler: iterate on each row (include or exclude based of filters) at the current viewport
getSelectedRows: select the multiple rows
setGridOption: update the column.name or any other modification on column and add a new column



*/
