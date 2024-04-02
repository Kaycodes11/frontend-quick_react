/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

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

function MyComp({ value }: ICellRendererParams) {
  const renderCountRef = useRef(1);
  return (
    <>
      <b>rendered: ({renderCountRef.current++})</b> {value}
    </>
  );
}

const columnDefs: ColDef[] = [
  { field: 'athlete' },
  { field: 'age', cellRenderer: MyComp },
  { field: 'country' },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

function App2() {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    fetch(urlMap.olympic)
      .then((result) => result.json())
      .then((rData) => setRowData(rData));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        animateRows
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
}

export default App2;

// react rendering - 04

// https://www.youtube.com/watch?v=oAQ5vavDupU&list=PLsZlhayVgqNwHNHeqpCkSgdRV08xrKtzW&index=4&ab_channel=ag-Grid
