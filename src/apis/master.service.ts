import { deleteWithUrl, getWithUrl, postWithUrl, putWithUrl } from '~/helpers/HttpHelpers';
import {
  API_URL,
} from '../configs/strings';
import { IApiResponse, ILocation, IUser } from './types.service';

export const CreateUserData = async (
  model: IUser,
): Promise<IApiResponse> => {
  return postWithUrl<IApiResponse>(
    API_URL,
    `/api/createUser`,
    model,
  )
};

export const getUser = async (
  id?: string,
): Promise<IUser> => {
  return getWithUrl<IUser>(
    API_URL,
    `/api/userDetails`,
    {id: id}
  )
};

export const updateUser = async (
  id: string,
  dataUpdate: IUser,
): Promise<IApiResponse> => {
  return putWithUrl<IApiResponse>(
    API_URL,
    `/api/update`,
    dataUpdate,
    { id: id },
  )
};

export const deleteUser = async (
  id: string,
): Promise<IApiResponse> => {
  return deleteWithUrl<IApiResponse>(
    API_URL,
    `/api/deleteUser`,
    undefined,
    {id:id}
  )
};

export const getLocation = async (
  id?: string,
): Promise<ILocation[]> => {
  return getWithUrl<ILocation[]>(
    API_URL,
    `/api/locations`,
    {id: id}
  )
};

export const createLocation = async (
  modal: ILocation,
): Promise<IApiResponse> => {
  return postWithUrl<IApiResponse>(
    API_URL,
    `/api/createLocation`,
    modal,
  )
};

export const updateLocation = async (
  id: string,
  dataUpdate: ILocation, 
): Promise<IApiResponse> => {
  return putWithUrl<IApiResponse>(
    API_URL,
    `/api/updateLocation`,
    dataUpdate,
    {id:id}
  )
};

export const deleteLocation = async (
  id: string
): Promise<IApiResponse> => {
  return deleteWithUrl<IApiResponse>(
    API_URL,
    `/api/deleteLocation`,
    undefined,
    {id: id}
  )
}
