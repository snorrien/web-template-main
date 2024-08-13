import { useEffect, useState } from 'react';
import './Row.scss';
import FileIcon from '../../../assets/icons/file.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import { Input } from '../Input/Input';
import { RowData } from 'src/interfaces/RowData';
import { createRowInEntity, deleteRow, updateRow } from 'client';

interface RowProps {
    data: RowData;
    level: number;
}

export function Row({ data, level }: RowProps) {
    const [editMode, setEditMode] = useState<number | null>(0);
    const [rowData, setRowData] = useState<RowData>();
    const [childRows, setChildRows] = useState<RowData[]>([]);

    useEffect(() => {
        setRowData(data);
    }, [data]);

    function handleRowDoubleClick(row: RowData) {
        setEditMode(prevEditMode => (prevEditMode === row.id ? null : row.id));
    };

    async function onUpdate(event: React.KeyboardEvent<HTMLInputElement>, row: RowData) {
        if (event.key === 'Enter') {
            setEditMode(0);
            await updateRow(row);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof RowData) {
        if (rowData) {
            setRowData({
                ...rowData,
                [field]: e.target.value
            });
        }
    }

    async function onCreate(parentRow: RowData) {
        const createdRowId = await createRowInEntity(parentRow.id);

        parentRow.child = [
            ...parentRow.child,
            {
                id: createdRowId,
                equipmentCosts: 0,
                estimatedProfit: 0,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                parentId: null,
                rowName: '',
                salary: 0,
                supportCosts: 0,
                child: []
            }
        ];

        setChildRows([
            ...childRows.filter(r => r.id !== parentRow.id),
            parentRow
        ]);
    }

    async function onDelete(rowId: number) {
        await deleteRow(rowId);
        setChildRows([
            ...childRows.filter(r => r.id !== rowId)
        ]);
    };

    if (childRows.length === 0 || !rowData) {
        return;
    }

    return (
        <>
            <div
                key={data.id}
                className={`nested-list ${rowData.child.length > 0 ? 'has-child' : ''}`}
                style={{ marginLeft: `${level * 20}px` }}>
                <div
                    className="list-item"
                    onDoubleClick={() => handleRowDoubleClick(rowData)}
                >
                    <div className="list-buttons">
                        <button className="button file-icon">
                            <FileIcon onClick={() => !editMode && onCreate(rowData)} />
                        </button>
                        <button className="button" >
                            <TrashIcon onClick={() => !editMode && onDelete(rowData.id)} />
                        </button>
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder={"Статья работы № 2"}
                            type="text"
                            disabled={editMode !== rowData.id}
                            value={rowData.rowName}
                            onChange={(e) => handleInputChange(e, 'rowName')}
                            onKeyDown={(e) => onUpdate(e, rowData)} />
                        <Input
                            placeholder={"38 200"}
                            type="number"
                            disabled={editMode !== rowData.id}
                            value={rowData.salary}
                            onChange={(e) => handleInputChange(e, 'salary')}
                            onKeyDown={(e) => onUpdate(e, rowData)} />
                        <Input
                            placeholder={"1 200"}
                            type="number"
                            disabled={editMode !== rowData.id}
                            value={rowData.equipmentCosts}
                            onChange={(e) => handleInputChange(e, 'equipmentCosts')}
                            onKeyDown={(e) => onUpdate(e, rowData)} />
                        <Input
                            placeholder={"850"}
                            type="number"
                            disabled={editMode !== rowData.id}
                            value={rowData.overheads}
                            onChange={(e) => handleInputChange(e, 'overheads')}
                            onKeyDown={(e) => onUpdate(e, rowData)} />
                        <Input
                            placeholder={"1 020 000"}
                            type="number"
                            disabled={editMode !== rowData.id}
                            value={rowData.estimatedProfit}
                            onChange={(e) => handleInputChange(e, 'estimatedProfit')}
                            onKeyDown={(e) => onUpdate(e, rowData)} />
                    </div>
                </div>
            </div>
            <div className="children-list">
                {childRows.map(childRow => (
                    <Row
                        key={childRow.id}
                        data={childRow}
                        level={level} />
                ))}
            </div>

        </>
    );
};