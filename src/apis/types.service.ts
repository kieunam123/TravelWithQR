/* eslint-disable spaced-comment */

export type Feature = 'SCALE_TEMP_HEADER' | 'SCALE_TEMP_DETAIL';
export type ActionLog = 'CREATE' | 'UPDATE' | 'DELETE' | 'SELECT';

export interface ILog {
  userName: string;
  feature: Feature;
  action: ActionLog;
  content: string;
  createdOn: number;
  createdOnLocal: string;
}

export interface IAuthResponse {
  Version?: string;
  StatusCode?: Number;
  code?: string;
  message?: string;
  result: boolean ;
  ResponseException?:string[];
}

export interface ISearchCommon {
  label: string;
  value: string | number;
  keySearch: string;
}

export interface IMasterCommon {
  id: string;
  idNum: number;
  name: string;
  status: string;
  link: string;
  icon: string;
  check: string;
}

export interface IHttpStatus {
  code: number;
  message: string;
}

export interface IApiResponse {
  status: string;
  msg: string;
  data: ISampleObj[];
}

//#begin 
export interface ISampleObj {
  name: string;
  mobile: string;
  address: string;
  id?: number;
  isUpdate?: boolean;
}

//#end