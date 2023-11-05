import { deleteWithUrl, getWithUrl, postWithUrl, putWithUrl } from '~/helpers/HttpHelpers';
import {
  API_URL,
} from '../configs/strings';
import { IApiResponse, ISampleObj } from './types.service';

export const createTestData = async (
  model: ISampleObj,
): Promise<IApiResponse> => {
  return postWithUrl<IApiResponse>(
    API_URL,
    `/api/create`,
    model,
  )
};

export const getDataTest = async (
  id?: string,
): Promise<IApiResponse> => {
  return getWithUrl<IApiResponse>(
    API_URL,
    `/api/userDetails`,
    {id: id}
  )
};

export const updateDataTest = async (
  id: string,
  dataUpdate: ISampleObj,
): Promise<IApiResponse> => {
  return putWithUrl<IApiResponse>(
    API_URL,
    `/api/update`,
    dataUpdate,
    { id: id },
  )
};

export const deleteDataTest = async (
  id: string,
): Promise<IApiResponse> => {
  return deleteWithUrl<IApiResponse>(
    API_URL,
    `/api/deleteUser`,
    undefined,
    {id:id}
  )
}
