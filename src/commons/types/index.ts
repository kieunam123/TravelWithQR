// Common type

// import {GroupType} from '../../apis/types.monitoring';

export type DateType = 'date' | 'time' | 'HH:mm:ss' | 'datetime';

// Font type
export type IconType =
  | 'AntDesign'
  | 'MaterialIcons'
  | 'EvilIcons'
  | 'Entypo'
  | 'Feather'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcons'
  | 'Foundation'
  | 'FontAwesome5'
  | 'FontAwesome'
  | 'Ionicons'
  | 'Octicons';

// Dropdown
export type DropdownItemType = {
  label: string;
  value: string | number;
  keySearch: string;
  [key: string]: any;
};

export interface IRadioData {
  label: string;
  value: string | number;
}

// Paging common
export interface IResult<T> {
  results: T[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
}

export const DepartmentId = {
  SALE: 1,
  WARE_HOUSE: 5,
  INTERNAL_TRANSFER: 4,
  IT_TEST: 99,
};

export interface IUserParams {
  userId: string;
  name: string;
  phone: string;
  address: string;
  imgurl: string;
  username: string;
  password: string;
  usertype: string;
}

export interface INavigateScreen {
  isNavigate: boolean;
  screen: string;
  param?: string | number | object;
}

export interface IHttpResponseError {
  status: number;
  message: string;
}

// export interface IGroupType {
//   key: string;
//   name: string;
//   type?: GroupType;
// }
