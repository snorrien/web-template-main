import { useEffect, useState } from 'react';
import './Table.scss';
import { fetchData } from '../../../client';
import { RowData } from 'src/interfaces/RowData';
import { Row } from '../Row/Row';

interface TableProps {
  titleList: string[];
}

export function Table({ titleList }: TableProps) {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    async function fetchRows() {
      const result = await fetchData();
      setRows(result);
    }
    fetchRows();
  }, []);

  function handleSetChilder(row: RowData[]): void {
    setRows(row)
  }

  return (
    <div className="table">
      <div className="table-header">
        {titleList.map((title, index) => (
          <div className="table-title" key={index}>{title}</div>
        ))}
      </div>
      <div className="table-content">
        {rows.map(row => (
          <div className='data' key={row.id}>
            <Row
              data={row}
              parentChildren={rows}
              setParentChildren={handleSetChilder} />
          </div>
        ))}
      </div>
    </div>
  );
};