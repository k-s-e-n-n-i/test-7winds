import { ITable } from '../ContentProject/ContentProject.interfaces';

export interface Props {
  onSubmit: any;
  level: number;
  i: number;
  id: number;
  linePrint?: ITable;
  add?: boolean;
  parent: ITable;
  listInfo: ITable[];
  listInfoLoaded: any;
  alertLoaded: any;
}
