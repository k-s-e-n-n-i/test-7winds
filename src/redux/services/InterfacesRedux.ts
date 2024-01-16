import { ITable } from '../../components/ContentProject/ContentProject.interfaces';

export interface IRedux {
  alertLoaded: any;
  success?: any;
}

export interface IReduxList extends IRedux {
  listInfoLoaded: any;
}

export interface IReduxCreate extends IRedux {
  data: ITable;
  newLine: ITable;
}

export interface IReduxEdit extends IRedux {
  sendData: ITable;
}

export interface IReduxDelete extends IRedux {
  id: number;
}
