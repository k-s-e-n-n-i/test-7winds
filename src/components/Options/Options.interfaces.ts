import { ITable } from '../ContentProject/ContentProject.interfaces';

export interface Props {
  level: number;
  id: number;
  addState: any;
  parent: ITable | null;
  listInfo: ITable[];
  listInfoLoaded: any;
  alertLoaded: any;
}
