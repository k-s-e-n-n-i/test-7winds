import { catchError, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { API } from './APIRequests';
import { IReduxCreate, IReduxDelete, IReduxEdit, IReduxList } from './InterfacesRedux';
import { ITable } from '../../components/ContentProject/ContentProject.interfaces';
import { IAPIEdit } from './InterfacesAPI';

class ServiceRedux {
  getList = ({ listInfoLoaded, alertLoaded }: IReduxList) => {
    API.getList()
      .pipe(
        tap((data: ITable[]) => {
          listInfoLoaded(data);
        }),
        catchError(PrintAlertError(alertLoaded))
      )
      .subscribe();
  };

  createLine = ({ data, newLine, success, alertLoaded }: IReduxCreate) => {
    API.createLine(data)
      .pipe(
        tap((data: IAPIEdit) => {
          newLine.id = data.current.id;
        }),
        finalize(() => success()),
        catchError(PrintAlertError(alertLoaded))
      )
      .subscribe();
  };

  editLine = ({ sendData, success, alertLoaded }: IReduxEdit) => {
    API.editLine({ data: sendData, rID: sendData.id })
      .pipe(
        finalize(() => success()),
        catchError(PrintAlertError(alertLoaded))
      )
      .subscribe();
  };

  deleteLine = ({ id, success, alertLoaded }: IReduxDelete) => {
    API.deleteLine(id)
      .pipe(
        finalize(() => success()),
        catchError(PrintAlertError(alertLoaded))
      )
      .subscribe();
  };
}

export const ServiceData = new ServiceRedux();

const PrintAlertError = (alertLoaded: any) => (err: any) => {
  switch (err.response.status) {
    case 400:
    case 401:
      alertLoaded(err);
      break;
    case 404:
      alertLoaded('');
      break;
    default:
      alertLoaded(err);
  }

  return of(err);
};
