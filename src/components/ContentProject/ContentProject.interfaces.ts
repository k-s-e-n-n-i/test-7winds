export interface Props {
  listInfo: ITable[];
  listInfoLoaded: any;
  alertLoaded: any;
}

export interface ITable {
  id: number;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  parentId: number | null;
  machineOperatorSalary: number | 0;
  mainCosts: number | 0;
  materials: number | 0;
  mimExploitation: number | 0;
  supportCosts: number | 0;
  child: ITable[];
}
