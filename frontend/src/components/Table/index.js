import React, { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';

export const Table = ({ columns, data, onRowSelect }) => {
  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // state: { selectedRowIds },
  } = useTable({ columns, data }, useRowSelect, hooks => {
    hooks.visibleColumns.push(columns => [
      {
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input
              type="checkbox"
              {...getToggleAllRowsSelectedProps()}
              className="form-checkbox h-5 w-5 accent-red-500"
              onClick={e => {
                e.stopPropagation();
                console.log("e.target.checked",e.target.checked);
                onRowSelect('all', e.target.checked);
              }}
            />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
              className="form-checkbox h-5 w-5 accent-red-500"
              onClick={e => {
                e.stopPropagation();
                console.log("e.target.checked_single",e.target.checked);
                onRowSelect(row.id, e.target.checked);
              }}
            />
          </div>
        ),
      },
      ...columns,
    ]);
  });

  // React.useEffect(() => {
  //   console.log('selectedRowOriginal', selectedRowOriginal);
  // }, [selectedRowOriginal]);

  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-purple-600">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="bg-white divide-y divide-gray-200"
      >
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                onClick: e => {
                  if (e.target.type !== 'checkbox') {
                    navigate(`/admin/user/${row.original.id}`);
                  }
                },
              })}
              className="hover:bg-gray-100 cursor-pointer"
            >
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className="px-2 py-4 whitespace-nowrap"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const TaskTable = ({ columns, data, setSelectedTaskIds }) => {
  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable({ columns, data }, useRowSelect, hooks => {
    hooks.visibleColumns.push(columns => [
      {
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input
              type="checkbox"
              {...getToggleAllRowsSelectedProps()}
              className="form-checkbox h-5 w-5 text-green-500"
              onClick={e => e.stopPropagation()}
            />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
              className="form-checkbox h-5 w-5 text-green-500"
              onClick={e => e.stopPropagation()}
            />
          </div>
        ),
      },
      ...columns,
    ]);
  });

  const prevDataRef = React.useRef();
  React.useEffect(() => {
    prevDataRef.current = data;
  }, []);
  const prevData = prevDataRef.current;

  React.useEffect(() => {
    if (!isEqual(prevData, data)) {
      const selectedTaskIds = Object.keys(selectedRowIds).map(
        rowId => data[rowId].id
      );
      setSelectedTaskIds(selectedTaskIds);
    }
  }, [selectedRowIds, data, setSelectedTaskIds]);

  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-purple-600">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="bg-white divide-y divide-gray-200"
      >
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps({})} className="hover:bg-gray-100">
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className="px-2 py-4 whitespace-nowrap"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
