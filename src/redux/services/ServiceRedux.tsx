import { catchError, of, forkJoin } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { API } from './APIRequests';

class ServiceRedux {
  /* ------------------------------------------------------------ */
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
