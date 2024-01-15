import { ITable } from '../ContentProject/ContentProject.interfaces';

export interface Props {
  fields: { varField: string; set: any }[];
  linePrint: ITable;
  i: number;
  level: number;
  editLine: any;
  deleteLine: any;
  createLine: any;

  editState: any;
  idEditLine: number;
  setIdEditLine: any;

  addState: any;
  idAddLine: number;
}
