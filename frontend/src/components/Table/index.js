import React from 'react';
import TableRowSkeleton from '../TableRowSkeleton';

const Table = ({ data = [], headings = [], isLoading }) => {
  const defaultRow = (
    <tr>
      {headings.map((heading, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          N/A
        </td>
      ))}
    </tr>
  );
  return (
    <div className="rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={headings.length} className="px-6 py-4 whitespace-nowrap">
                <TableRowSkeleton />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                {headings.map((heading, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {row[heading]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            defaultRow
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
