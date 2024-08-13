import { ChangeResult } from "src/interfaces/ChangeResult";
import { RowData } from "src/interfaces/RowData";

const eID = 137965;
const url = "http://185.244.172.108:8081";

const headers = {
  'Content-Type': 'application/json'
};

export async function fetchData(): Promise<RowData[]> {
  return fetch(`${url}/v1/outlay-rows/entity/${eID}/row/list`, {
    method: 'GET',
    headers: headers
  }).then(response => response.json())
}

export async function createRowInEntity(parentId: number | null): Promise<number> {
  return fetch(`${url}/v1/outlay-rows/entity/${eID}/row/create`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      equipmentCosts: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      parentId: parentId,
      rowName: "",
      salary: 0,
      supportCosts: 0
    }),
  }).then(response => response.json())
  .then(json => {
    const row = <ChangeResult>json;
    return row.current.id;
  });
}

export async function deleteRow(rowId: number): Promise<ChangeResult> {
  return fetch(`${url}/v1/outlay-rows/entity/${eID}/row/${rowId}/delete`, {
    method: 'DELETE',
    headers: headers,
  }).then(response => response.json());
}

export async function updateRow(updatedRow: RowData): Promise<ChangeResult> {
  return fetch(`${url}/v1/outlay-rows/entity/${eID}/row/${updatedRow.id}/update`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      equipmentCosts: updatedRow.equipmentCosts,
      estimatedProfit: updatedRow.estimatedProfit,
      machineOperatorSalary: updatedRow.machineOperatorSalary,
      mainCosts: updatedRow.mainCosts,
      materials: updatedRow.materials,
      mimExploitation: updatedRow.mimExploitation,
      overheads: updatedRow.overheads,
      parentId: updatedRow.parentId,
      rowName: updatedRow.rowName,
      salary: updatedRow.salary,
      supportCosts: updatedRow.supportCosts
    })
  }).then(response => response.json());
}