import { useEffect, useState } from 'react';
import './Row.scss';
import FileIcon from '../../../assets/icons/file.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import { Input } from '../Input/Input';
import { RowData } from 'src/interfaces/RowData';
import { createRowInEntity, deleteRow, updateRow } from 'client';

interface RowProps {
    data: RowData;
    parentChildren: RowData[];
    setParentChildren: (row: RowData[]) => void;
}

export function Row({ data, parentChildren, setParentChildren }: RowProps) {
    const [editMode, setEditMode] = useState<number | null>(0);
    const [rowData, setRowData] = useState<RowData>();

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

    async function onCreate() {
        if (!rowData) {
            return;
        }

        const createdRowId = await createRowInEntity(rowData.id);

        setRowData({
            ...rowData,
            child: [
                ...rowData.child,
                {
                    id: createdRowId,
                    equipmentCosts: 0,
                    estimatedProfit: 0,
                    machineOperatorSalary: 0,
                    mainCosts: 0,
                    materials: 0,
                    mimExploitation: 0,
                    overheads: 0,
                    parentId: rowData.id,
                    rowName: '',
                    salary: 0,
                    supportCosts: 0,
                    child: []
                }
            ]
        });
    }

    async function handleDelete(rowId: number) {
        await deleteRow(rowId);
        if (rowData) {
            console.log(rowId)
            console.log(parentChildren.filter(c => c.id !== rowId))
            setParentChildren([
                ...parentChildren.filter(c => c.id !== rowId)
            ])
        }
    }

    if (!rowData) {
        return;
    }

    function handleParentChildren(rows: RowData[]): void {
        if (rowData) {
            setRowData({
                ...rowData,
                child: rows
            });
        }
    }

    return (
        <div className={`row ${rowData.child.length > 0 ? 'has-child' : ''}`}>
            <div className="list-item" onDoubleClick={() => handleRowDoubleClick(rowData)}>
                <div className="list-buttons">
                    <button className="button file-icon">
                        <FileIcon onClick={() => !editMode && onCreate()} />
                    </button>
                    <button className="button trash-icon" >
                        <TrashIcon onClick={() => !editMode && handleDelete(rowData.id)} />
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
            <div className="children-list">
                {rowData.child.map(childRow => (
                    <Row
                        key={childRow.id}
                        data={childRow}
                        parentChildren={rowData.child}
                        setParentChildren={handleParentChildren} />
                ))}

            </div>
        </div>
    );
};