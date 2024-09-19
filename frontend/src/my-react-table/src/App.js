/* eslint-disable */
import { useTable } from 'react-table';
import './App.css';
import fakeData from "./ELEMENTS.json";
import * as React from "react";

function App() {
  const data = React.useMemo(() => fakeData, []);
  const columns = React.useMemo(() => [
    { Header: "ID", accessor: "id" },
    { Header: "Employee Name", accessor: "first_name" },
    { Header: "Department", accessor: "last_name" },
    { Header: "Serial Number", accessor: "email" },
    { Header: "Sydney", accessor: "gender" },
    { Header: "Office", accessor: "university" }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default App;
