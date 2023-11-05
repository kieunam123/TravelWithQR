
import { ILocation, ILocationPlace, IUser } from '~/apis/types.service';
import {DropdownItemType} from '../../commons/types';

import {

  ICreateUser,
  IDeleteUser,
  IGetLocation,
  IGetUser,
  IGetUserSuccess,
  IUpdateUser,
  Types,

} from './master.types';

const MasterActions = {
  CreateUser: (model: IUser): ICreateUser => {
    return {
      type: Types.MASTER_CREATE_TEST,
      payload: model
    };
  },

  getUser: (id?: string): IGetUser => {
    return {
      type: Types.MASTER_GET_TEST,
      payload: {id}
    }
  },

  getUserSuccess: (User: IUser[]): IGetUserSuccess => {
    return {
      type: Types.MASTER_GET_TEST_SUCCESS,
      payload: {User}
    }
  },

  updateUser: (id: string, dataUpdate: IUser): IUpdateUser=> {
    return {
      type: Types.MASTER_UPDATE_TEST,
      payload: {id, dataUpdate}
    }
  },
  deleteUser: (id: string): IDeleteUser => {
    return {
      type: Types.MASTER_DELETE_TEST,
      payload: {id}
    }
  },

  getLocation: (id?: string): IGetLocation => {
    return {
      type: Types.MASTER_GET_LOCATION,
      payload: {id}
    }
  },
  getLocationSuccess: (locations: ILocation[]) => {
    return {
      type: Types.MASTER_GET_LOCATION_SUCCESS,
      payload: {locations}
    }
  },
  getPlacesSuccess: (places: ILocationPlace[]) => {
    return {
      type: Types.MASTER_GET_PLACES_SUCCESS,
      payload: {places}
    }
  }

}

export default MasterActions;
