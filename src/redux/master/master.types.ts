
import { ILocation, ILocationPlace, IUser } from '~/apis/types.service';
import {DropdownItemType} from '../../commons/types';


export interface IMasterState {
  User: IUser[];
  locations: ILocation[];
  places: ILocationPlace[];
}


export enum Types {
  MASTER_CREATE_TEST = 'MASTER_CREATE_TEST',
  MASTER_GET_TEST = 'MASTER_GET_TEST',
  MASTER_GET_TEST_SUCCESS = 'MASTER_GET_TEST_SUCCESS',
  MASTER_DELETE_TEST = 'MASTER_DELETE_TEST',
  MASTER_UPDATE_TEST = 'MASTER_UPDATE_TEST',
  MASTER_GET_LOCATION = 'MASTER_GET_LOCATION',
  MASTER_GET_LOCATION_SUCCESS = 'MASTER_GET_LOCATION_SUCCESS',
  MASTER_GET_PLACES_SUCCESS = 'MASTER_GET_PLACES_SUCCESS',
  MASTER_DELETE_LOCATION = 'MASTER_DELETE_LOCATION',
  MASTER_CREATE_LOCATION = 'MASTER_CREATE_LOCATION',
  MASTER_UPDATE_LOCATION = 'MASTER_UPDATE_LOCATION',
  
}

export interface ICreateUser {
  type: Types.MASTER_CREATE_TEST;
  payload: IUser;
}

export interface IGetUser {
  type: Types.MASTER_GET_TEST;
  payload: {id?: string};
}

export interface IGetUserSuccess {
  type: Types.MASTER_GET_TEST_SUCCESS;
  payload: {User: IUser[]}
}

export interface IDeleteUser {
  type: Types.MASTER_DELETE_TEST;
  payload: {id: string}
}

export interface IUpdateUser{
  type: Types.MASTER_UPDATE_TEST;
  payload: {id:string, dataUpdate: IUser}
}

export interface IGetLocation {
  type: Types.MASTER_GET_LOCATION;
  payload: {id?: string}
}

export interface IGetLocationSuccess {
  type: Types.MASTER_GET_LOCATION_SUCCESS;
  payload: {locations: ILocation[]}
}

export interface IGetPlacesSuccess {
  type: Types.MASTER_GET_PLACES_SUCCESS;
  payload: {places: ILocationPlace[]}
}

export interface IDelteLocation {
  type: Types.MASTER_DELETE_LOCATION;
  payload: {id: string}
}

export interface ICreateLocation {
  type: Types.MASTER_CREATE_LOCATION;
  payload: ILocation
}

export interface IUpdateLocation {
  type: Types.MASTER_UPDATE_LOCATION;
  payload: {id: string, dataUpdate: ILocation}
}

export type MasterActionsType = 
  | IGetPlacesSuccess
  | IGetLocationSuccess
  | IGetUserSuccess;
