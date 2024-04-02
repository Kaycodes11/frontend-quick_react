/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, FilterModel } from 'ag-grid-community';

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

const columnDefs: ColDef[] = [
  { field: 'athlete', filter: 'agTextColumnFilter' },
  { field: 'age', filter: 'agNumberColumnFilter' },
  { field: 'year', filter: 'agSetColumnFilter' },
  { field: 'country', filter: 'agMultiColumnFilter' },
  { field: 'date', filter: 'agDateColumnFilter' },
];

function App3() {
  const gridRef = useRef<AgGridReact>(null);
  const savedFilterState = useRef<FilterModel | null>(null);
  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    fetch(urlMap.olympic)
      .then((result) => result.json())
      .then((rData) => setRowData(rData));
  }, []);

  const onBtSave = useCallback(() => {
    const filterModel = gridRef.current?.api.getFilterModel(); // result from here could be null
    console.log('Saving Filter Model', filterModel);
    savedFilterState.current = filterModel ?? null;
  }, []);

  const onBtApply = useCallback(() => {
    const filterModel = savedFilterState.current;
    console.log('Applying Filter Model', filterModel);
    gridRef.current?.api.setFilterModel(filterModel || null); // Ensure passing null instead of undefined
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <div>
        <button type="button" onClick={onBtSave}>
          Save
        </button>
        <button type="button" onClick={onBtApply}>
          Apply
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        animateRows
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          // floatingFilter: true, (can't use it since it is part of ag-grid-enterprise)
          filterParams: { buttons: ['apply', 'clear'] },
        }}
      />
    </div>
  );
}

export default App3;

// built in column filters i.e. react-filters

// https://www.youtube.com/watch?v=pebXUHUdlos&list=PLsZlhayVgqNwHNHeqpCkSgdRV08xrKtzW&index=5&ab_channel=ag-Grid
