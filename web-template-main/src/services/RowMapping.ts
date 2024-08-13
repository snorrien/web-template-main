import { ChangedRowData } from "src/interfaces/ChangeResult";
import { RowData } from "src/interfaces/RowData";

export function mapToRowData(changedRow: ChangedRowData): RowData {
    return {
      equipmentCosts: changedRow.equipmentCosts,
      estimatedProfit: changedRow.estimatedProfit,
      id: changedRow.id,
      machineOperatorSalary: changedRow.machineOperatorSalary,
      mainCosts: changedRow.mainCosts,
      materials: changedRow.materials,
      mimExploitation: changedRow.mimExploitation,
      overheads: changedRow.overheads,
      rowName: changedRow.rowName,
      salary: changedRow.salary,
      supportCosts: changedRow.supportCosts,
      child: [],
      parentId: null
    };
  }