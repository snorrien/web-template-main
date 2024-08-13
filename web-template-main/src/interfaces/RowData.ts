export interface RowData {
    equipmentCosts: number;
    estimatedProfit: number;
    id: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    parentId: number | null;
    rowName: string;
    salary: number;
    supportCosts: number;
    child: RowData[];
}