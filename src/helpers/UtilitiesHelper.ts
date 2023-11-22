import {Platform, Dimensions} from 'react-native';
import { ISearchCommon } from '../apis/types.service';
import numeral from 'numeral';
import { getAccessToken } from './AsyncStorageHelpers';
import { navigate } from '~/navigations';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const scaleFactor = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {verticalScale, scaleFactor, scale};

export const isInvalidString = (input?: string): boolean => {
  if (input === null) return true;
  if (input === undefined) return true;
  if (`${input}`.trim() === '') return true;
  return false;
};

export const isInvalidEmail = (input? : string): boolean => {
  if (
    input === 'nam.kieuvuhoai@japfa.com'
    
  ) return true;
  return false;
}

export async function callApiGetWithToken(url: string, endpoint: string) {
  const _token = await getAccessToken();
  const URL = `${url}/${endpoint}`;
  console.log(`[GET] ${URL}`)
  return fetch(URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // Authorization: 'Bearer ' + _token,
      // Authorization: 'Bearer ' + `eyJ0eXAiOiJKV1QiLCJub25jZSI6ImJpcjhDYU80WHhkVlg3Tm1DMkNNVVppR0p3VnVKTlZsaFdWbHlHbzVQTUEiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJodHRwczovL291dGxvb2sub2ZmaWNlMzY1LmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzA4YzY3ZDI3LThmZTMtNDY2My04MzQ5LTY4YmMxYWNlMmViZS8iLCJpYXQiOjE1OTcyOTk0MTAsIm5iZiI6MTU5NzI5OTQxMCwiZXhwIjoxNTk3MzAzMzEwLCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiRTJCZ1lGaHJWWFJNUENMRXE5TzdiKzdSZjZhTCtCbkZ6Y1B2enB4amFqRjFBZlBwREVFQSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiTG9naW4iLCJhcHBpZCI6ImQxNGNhMDk4LWViOGUtNGNiYi1hNzQ4LTA5ZmY2MDM1YzU1ZiIsImFwcGlkYWNyIjoiMCIsImVuZnBvbGlkcyI6W10sImZhbWlseV9uYW1lIjoiVnUgRGluaCIsImdpdmVuX25hbWUiOiJLaG9hIiwiaXBhZGRyIjoiMTE1Ljc1LjEuMjI2IiwibmFtZSI6IlZ1IERpbmggS2hvYSAoSE8gSkNWIC0gSVQpIiwib2lkIjoiYzkwYmZjZDUtNzNmNC00NmE5LWJmM2EtYjkwMTNlOGFkZjZlIiwicHVpZCI6IjEwMDMyMDAwQ0MwNDA1M0YiLCJzY3AiOiJVc2VyLlJlYWQiLCJzaWQiOiI2Y2RhMjg3Yy03YjhiLTQ4MjYtOGY5Mi0yMzZmY2U0ZGRiZjkiLCJzdWIiOiJWWWkzVVhFcHRqVEpZQVljdlpqbmxnZ2dsdDBoNC13VmlsLXVjdjZOcDJnIiwidGlkIjoiMDhjNjdkMjctOGZlMy00NjYzLTgzNDktNjhiYzFhY2UyZWJlIiwidW5pcXVlX25hbWUiOiJraG9hLnZ1ZGluaEBqYXBmYS5jb20iLCJ1cG4iOiJraG9hLnZ1ZGluaEBqYXBmYS5jb20iLCJ1dGkiOiJMZmNJSXdRV0NrR1VteTdxckswNkFBIiwidmVyIjoiMS4wIn0.lAOAaLipN275ej4Rx6-jFH67wuquOQuH2RdF9K3tO-rPiEIrBqml6ewH4_cqFZNkI2WnnWNGpPV9GhVa5qU1yyVrUBqkuHQQUCZi2RWXj1YRrb-v_kHD3a8u5wgIENmFoJN3piu5GmmKLF4pXEQTVILEHY0aqQ4VDkNDEqvdfEipnIOkLiOLs9L-KjoRkAuWWczcWeL9I42H7ylc7SKxmxhMm8M89Q4DAOk0k3fekmo4j7P1kAuh2VuwWkRHIjMt5XoDRDFFbDWRTIWaVRlFktNqSPLRuGKn1HUUI9jCjnCeS0yEjcGBhPKSZEBD4b51fTk2hCAMrwlDnFRrISGjuQ`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => {
      console.log(`API error`)
    });
}

/**
 * Kiểm tra chuổi có hợp lệ không
 * @param input
 * True: hợp lệ, False: không hợp lệ
 */
export const isValidString = (input?: string): boolean => {
  if (input === undefined) return false;
  return !isInvalidString(input);
};

export const numberFormat = (input?: string | number, prefix = 'VNĐ'): string => {
  if (!input) {
    if (!prefix) return `0${prefix}`;
    return `0 ${prefix}`;
  }
  if (prefix) return `${numeral(input).format('0,0')} ${prefix}`;
  return `${numeral(input).format('0,0')}`;
};

export const doubleFormat = (
  input?: number,
  prefix? : string,
  degit?: string,
): string => {
  if (!input) return `0 ${prefix ?? 'VND'}`;
  const strDegit = degit ?? '0,0.0';
  if (isValidString(prefix ?? 'VND'))
    return `${numeral(input).format(strDegit)} ${prefix ?? 'VND'}`;
  return `${numeral(input).format(strDegit)}`;
};

export const formatDouble = (value: number | null | undefined): number => {
  if (!value) return 0;
  return Math.round(value * 100) / 100;
};

export const convertStringToNumber = (input: string): number => {
  return numeral(input).value();
};

export const removeUnicode = (input?: string): string => {
  if (!input) return '';
  const r = input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('đ', 'd');
  return r;
};

export const moreThanZero = (number: number | undefined): boolean => {
  if (number === undefined) return false;
  if (number <= 0) return false;
  return true;
};

export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

export const isIos = (): boolean => {
  return Platform.OS === 'ios';
};

export const isWeb = (): boolean => {
  return Platform.OS === 'web';
}

export const nameOf = <T>(name: keyof T) => name;

export function convertToLocalObject<T extends ISearchCommon>(
  datasource: Array<T>,
  accessorLabel: string | string[],
  accessorValue: string | string[],
  accessorKeySearch?: string[],
): Array<T> {
  let arrAccessorLabel: string[] = [];
  let arrAccessorKey: string[] = [];

  // Label
  if (typeof accessorLabel === 'string') arrAccessorLabel.push(accessorLabel);
  else {
    arrAccessorLabel = [...accessorLabel];
  }

  // key
  if (typeof accessorValue === 'string') arrAccessorKey.push(accessorValue);
  else arrAccessorKey = [...accessorValue];

  datasource.forEach((item) => {
    const newItem = item;
    let label = '';
    let value = '';

    arrAccessorLabel.forEach((a) => {
      label += newItem[a] ;
    });

    arrAccessorKey.forEach((b) => {
      value += newItem[b];
    });

    newItem.label = label;
    newItem.value = value;
    let keySearch = '';
    if (!accessorKeySearch || accessorKeySearch.length < 1) {
      keySearch = `${value} ${label}`;
    } else {
      for (let i = 0; i < accessorKeySearch.length; i += 1) {
        keySearch += newItem[accessorKeySearch[i]];
      }
    }
    newItem.keySearch = removeUnicode(keySearch);
    return newItem;
  });
  return datasource;
}

export const checkNameOfInterface = <T extends object>(
  p: any,
  name: string,
): p is T => Object.prototype.hasOwnProperty.call(p, name);


export const getDistanceFromUserToFarm = (latUser:number, longUser:number, latFarm:number, longFarm:number):number => {
  const R = 6371 //Radius of the earth in km
  const dLat = deg2rad(latFarm - latUser);
  const dLon = deg2rad(longFarm - longUser);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    Math.cos(deg2rad(latUser)) * 
      Math.cos(deg2rad(latFarm)) * 
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  
  return d;
} 

export const goToScreen = (
  screenType: string,
  params?: any,
): void => {
  const nav = screenType;
  navigate(nav, params);
};

function deg2rad(deg:number) {
  return deg * (Math.PI / 180);
}

// export async function callApiPostWithTokenApiOfKim(endpoint, form_data) {
//   const _token = await userToken();
//   const URL = `${FILE_CONTROL_API}/${endpoint}`;
//   return fetch(URL, {
//     method: 'POST',
//     headers: {
//       // Accept: 'application/json',
//       Authorization: 'Bearer ' + JSON.parse(_token),
//       // 'Content-Type': 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//     body: form_data,
//   })
//     .then((res) => res.json())
//     .catch((err) => {});
// }