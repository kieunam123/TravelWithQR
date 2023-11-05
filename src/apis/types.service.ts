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

export interface ILocation {
  id: number;
  country: string;
  category: string;
  description: string;
  short_description: string;
  date_created: string;
  date_updated: string;
  name: string;
  rate: number;
  image_links: string[];
  places: ILocationPlace[];
}

export interface ILocationPlace {
  address: string;
  image_link: string[];
  name: string;
  rating: number;
  description: string;
  city: string;
  country: string;
  short_description: string;
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
  data: any[];
}

//#begin 
export interface IUser {
  name: string;
  mobile: string;
  address: string;
  id?: number;
  isUpdate?: boolean;
}

//#end