import { catchError, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { API } from './APIRequests';
import { IReduxCreate, IReduxDelete, IReduxEdit, IReduxList } from './InterfacesRedux';
import { UpdatedData } from './GlobalFunctions';
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

  createLine = ({ data, success, alertLoaded }: IReduxCreate) => {
    API.createLine(data)
      .pipe(
        tap((data: IAPIEdit) => {
        }),
        finalize(() => success()),
        catchError(PrintAlertError(alertLoaded))
      )
      .subscribe();
  };

  editLine = ({ sendData, success, listInfo, listInfoLoaded, alertLoaded }: IReduxEdit) => {
    API.editLine({ data: sendData, rID: sendData.id })
      .pipe(
        tap((data: IAPIEdit) => {
          const arr = UpdatedData({ listInfo, currentData: data.current, sendData });
          listInfoLoaded(arr);
        }),
        finalize(() => success()),
        catchError(PrintAlertError(alertLoaded))
      )
      .subscribe();
  };

  deleteLine = ({ id, success, listInfo, listInfoLoaded, alertLoaded }: IReduxDelete) => {
    API.deleteLine(id)
      .pipe(
        tap(() => {
          const arr = listInfo.reduce((result: any, item) => {
            return item.id !== id ? [...result, item] : result;
          }, []);
          listInfoLoaded(arr);
        }),
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
      alertLoaded(err.response.data.message);
      break;
    case 404:
      alertLoaded('');
      break;
    default:
      alertLoaded(err.response.data.message);
  }

  return of(err);
};
