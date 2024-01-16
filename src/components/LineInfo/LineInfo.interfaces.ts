import { ITable } from '../ContentProject/ContentProject.interfaces';

export interface Props {
  linePrint: ITable;
  numChild: number;
  level: number;

  editState: any;
  idEditLine: number;
  addState: any;
  idAddLine: number;

  clean: any;
  parent: ITable | null;
}
