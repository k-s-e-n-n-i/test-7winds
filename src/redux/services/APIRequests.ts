import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITable } from '../../components/ContentProject/ContentProject.interfaces';
import { IAPIEdit } from './InterfacesAPI';

const { REACT_APP_URL_API } = process.env;
export const baseURL = `http://${REACT_APP_URL_API}`;

const ApiId = {
  id: 124722,
  rowName: '8a2df61e-2313-4cee-be8e-cf7e229ea72f',
};
const eID = ApiId.id;

class APIRequests {
  axiosConfig: AxiosRequestConfig = {
    baseURL: `${baseURL}/v1/outlay-rows/entity/${eID}/row`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axiosConfigWithAuthorization: AxiosRequestConfig = Object.assign({}, this.axiosConfig, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  setAxiosConfigWithAuthorization = (token: string) => {
    if (this.axiosConfigWithAuthorization.headers) {
      this.axiosConfigWithAuthorization.headers.Authorization = `Bearer ${token}`;
      this.axiosInstanceWithAuthorization = this.axiosInit(this.axiosConfigWithAuthorization);
    }
  };

  axiosInit = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);
    return axiosInstance;
  };

  axiosInstance = this.axiosInit(this.axiosConfig);
  axiosInstanceWithAuthorization = this.axiosInit(this.axiosConfigWithAuthorization);

  funcGet = (inst: AxiosInstance, url: string, queryParams?: object) => {
    return defer(() => inst.get(url, { params: queryParams })).pipe(map((result) => result.data));
  };

  get = <T>(url: string, queryParams?: object): Observable<T> => {
    return this.funcGet(this.axiosInstance, url, queryParams);
  };

  getWithAuthorization = <T>(url: string, queryParams?: object): Observable<T> => {
    return this.funcGet(this.axiosInstanceWithAuthorization, url, queryParams);
  };

  post = <T>(url: string, queryParams: object): Observable<T> => {
    return defer(() => this.axiosInstance.post(url, queryParams)).pipe(map((result) => result.data));
  };

  postBody = <T>(url: string, queryParams: object): Observable<T> => {
    return defer(() =>
      this.axiosInstanceWithAuthorization.post(url, queryParams, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).pipe(map((result) => result.data));
  };

  delete = <T>(url: string): Observable<T> => {
    return defer(() => this.axiosInstanceWithAuthorization.delete(url)).pipe(map((result) => result.data));
  };

  put = <T>(url: string, queryParams: object): Observable<T> => {
    return defer(() => this.axiosInstanceWithAuthorization.put(url, queryParams)).pipe(
      map((result) => result.data)
    );
  };

  //-----------------------------------------------------------------------------

  getList = () => this.get<ITable[]>(`/list`);

  createLine = (data: ITable) => this.post<IAPIEdit>(`/create`, data);

  editLine = ({ data, rID }: { data: ITable; rID: number | null }) =>
    this.post<IAPIEdit>(`/${rID}/update`, data);

  deleteLine = (rID: number) => this.delete(`/${rID}/delete`);
}

export const API = new APIRequests();
