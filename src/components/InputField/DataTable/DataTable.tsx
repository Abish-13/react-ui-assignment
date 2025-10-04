import React, { useState, useMemo, useEffect } from 'react';

// Prop definitions from the assignment [cite: 39-51]
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

type SortConfig<T> = {
  key: keyof T;
  direction: 'ascending' | 'descending';
};

export const DataTable = <T extends { id: number | string }>({ data, columns, selectable, onRowSelect, loading }: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectRow = (row: T) => {
    setSelectedRows(prev => {
      const isSelected = prev.some(r => r.id === row.id);
      if (isSelected) {
        return prev.filter(r => r.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-lg font-medium text-gray-700">Loading...</div>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3">
                <input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === data.length && data.length > 0} />
              </th>
            )}
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => col.sortable && requestSort(col.dataIndex)}
              >
                {col.title}
                {sortConfig && sortConfig.key === col.dataIndex ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <tr key={row.id} className={selectedRows.some(r => r.id === row.id) ? 'bg-blue-50' : ''}>
                {selectable && (
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.some(r => r.id === row.id)} 
                      onChange={() => handleSelectRow(row)} 
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};