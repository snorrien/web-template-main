import { useEffect, useState } from 'react';
import './Table.scss';
import { fetchData } from '../../../client';
import { RowData } from 'src/interfaces/RowData';
import { Row } from '../Row/Row';

interface TableProps {
  titleList: string[];
}

export function Table({ titleList }: TableProps) {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    fetchData().then(r => setData(r));
  }, []);

  return (
    <div className="table">
      <div className="table-header">
        {titleList.map((title, index) => (
          <div className="table-title" key={index}>{title}</div>
        ))}
      </div>
      {data.map(row => (
        <Row
          key={row.id}
          data={row}
          level={1} />
      ))}
    </div>
  );
};