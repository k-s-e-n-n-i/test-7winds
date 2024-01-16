import { ITable } from '../ContentProject/ContentProject.interfaces';

export interface Props {
  level: number;
  firstChild: boolean;
  id: number;
  addState: any;
  parent: ITable | null;
  listInfo: ITable[];
  listInfoLoaded: any;
  alertLoaded: any;
}
