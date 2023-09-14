
import { ISampleObj } from '~/apis/types.service';
import {DropdownItemType} from '../../commons/types';


export interface IMasterState {
  dataTest: ISampleObj[];
}


export enum Types {
  MASTER_CREATE_TEST = 'MASTER_CREATE_TEST',
  MASTER_GET_TEST = 'MASTER_GET_TEST',
  MASTER_GET_TEST_SUCCESS = 'MASTER_GET_TEST_SUCCESS',
  MASTER_DELETE_TEST = 'MASTER_DELETE_TEST',
  MASTER_UPDATE_TEST = 'MASTER_UPDATE_TEST',
}

export interface ICreateTest {
  type: Types.MASTER_CREATE_TEST;
  payload: ISampleObj;
}

export interface IGetTest {
  type: Types.MASTER_GET_TEST;
  payload: {id?: string};
}

export interface IGetTestSuccess {
  type: Types.MASTER_GET_TEST_SUCCESS;
  payload: {dataTest: ISampleObj[]}
}

export interface IDeleteTest {
  type: Types.MASTER_DELETE_TEST;
  payload: {id: string}
}

export interface IUpdateTest {
  type: Types.MASTER_UPDATE_TEST;
  payload: {id:string, dataUpdate: ISampleObj}
}

export type MasterActionsType = 
  | IGetTestSuccess;
