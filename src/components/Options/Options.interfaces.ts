import { ITable } from '../ContentProject/ContentProject.interfaces';

export interface Props {
  id: number;
  addState: any;
  parent: ITable | null;
  listInfo: ITable[];
  listInfoLoaded: any;
  alertLoaded: any;
}
