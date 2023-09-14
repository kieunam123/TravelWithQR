
import { ISampleObj } from '~/apis/types.service';
import {DropdownItemType} from '../../commons/types';

import {

  ICreateTest,
  IDeleteTest,
  IGetTest,
  IGetTestSuccess,
  IUpdateTest,
  Types,

} from './master.types';

const MasterActions = {
  createTest: (model: ISampleObj): ICreateTest => {
    return {
      type: Types.MASTER_CREATE_TEST,
      payload: model
    };
  },

  getDataTest: (id?: string): IGetTest => {
    return {
      type: Types.MASTER_GET_TEST,
      payload: {id}
    }
  },

  getDataTestSuccess: (dataTest: ISampleObj[]): IGetTestSuccess => {
    return {
      type: Types.MASTER_GET_TEST_SUCCESS,
      payload: {dataTest}
    }
  },

  updateDataTest: (id: string, dataUpdate: ISampleObj): IUpdateTest => {
    return {
      type: Types.MASTER_UPDATE_TEST,
      payload: {id, dataUpdate}
    }
  },
  deleteDateTest: (id: string): IDeleteTest => {
    return {
      type: Types.MASTER_DELETE_TEST,
      payload: {id}
    }
  }
}

export default MasterActions;
