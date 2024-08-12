import { useState } from 'react';
import './Table.scss';
import FileIcon from '../../../assets/icons/file.svg';
import { Input } from '../Input/Input';

interface TableProps {
  titleList: string[];
}

export function Table({ titleList }: TableProps) {

  const example = [
    "Наименование работ", "Основная з/п", "Оборудование", "Накладные расходы", "Сметная прибыль"
  ]

  const placeholders = [
    "Статья работы № 2", "38200", "1200", "850", "1020000"
  ]

  return (
    <div className="table">
      <div className="table-header">
        {titleList.map((title, index) => (
          <div className="table-title" key={index}>{title}</div>
        ))}
      </div>
      <div className="row">
        {example.map((item, index) => (

          <div className="data" key={index}>{item}</div>

        ))}
      </div>
      <div className="row edit">
        {placeholders.map((item, index) => (
          <Input key={index} placeholder={item} />


        ))}
      </div>
    </div>
  );
};