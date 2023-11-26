import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import { ICreateLocation, ICreateUser, IDeleteUser, IDelteLocation, IGetLocation, IGetUser, IUpdateLocation, IUpdateUser, Types } from "./master.types";
import { CreateUserData, createLocation, deleteLocation, deleteUser, getLocation, getUser, updateLocation, updateUser } from "~/apis/master.service";
import { IApiResponse, ILocation, ILocationPlace, IUser } from "~/apis/types.service";
import GlobalActions from "../global/global.actions";
import MasterActions from "./master.actions";
import { getUserParams, onSagaNavigate, safe } from "../saga.helpers";
import { INavigateScreen, IUserParams } from "~/commons/types";
import ScreenType from "~/navigations/screen.constant";

//#region ================== WORKER ====================

function* handleCreateUser({ payload: IUser }: ICreateUser) {
  const response: IApiResponse = yield call(
    CreateUserData,
    IUser
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal(`Đăng ký thành công`));
    const nav: INavigateScreen = {
      isNavigate: true,
      screen: ScreenType.Main.Login,
      param: { userRegistered: IUser }
    }
    onSagaNavigate(nav)
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleGetData({ payload }: IGetUser) {
  const { id } = payload;
  const response: IApiResponse = yield call(
    getUser,
    id,
  );
  if (response.status === 'Success') {
    const User: IUser[] = response.data.map((item) => {
      return {
        ...item,
        isUpdate: false,
      }
    })
    yield put(MasterActions.getUserSuccess(User));
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleUpdateData({ payload }: IUpdateUser) {
  const { id, dataUpdate } = payload;
  const userParasm: IUserParams = yield select(getUserParams);
  const response: IApiResponse = yield call(
    updateUser,
    id,
    dataUpdate,
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.updateUserParams({...userParasm,...dataUpdate}));
    yield put(GlobalActions.openErrorInfoModal(`Cập nhật dữ liệu thành công`));
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleDeleteData({ payload }: IDeleteUser) {
  const { id } = payload;
  const response: IApiResponse = yield call(
    deleteUser,
    id,
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal('Xoá dữ liệu thành công'));
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleGetLocation({ payload }: IGetLocation) {
  const { id } = payload;
  const response: IApiResponse = yield call(
    getLocation,
    id
  );
  if (response.status === 'Success') {
    yield put(MasterActions.getLocationSuccess(response.data))
    if (response.data) {
      let places: ILocationPlace[] = [];
      const locations: ILocation[] = response.data;
      locations.forEach((item) => {
        if (item.places[0] !== undefined) {
          item.places.forEach((place) => {
            places.push({ ...place, city: item.name, country: item.country })
          })
        }
      })
      yield put(MasterActions.getPlacesSuccess(places));
    }
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleDeleteLocation({ payload }: IDelteLocation) {
  const { id } = payload;
  const response: IApiResponse = yield call(
    deleteLocation,
    id
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal('Xoá dữ liệu thành công'));
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleCreateLocation({ payload: ILocation }: ICreateLocation) {
  const response: IApiResponse = yield call(
    createLocation,
    ILocation
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal(`Tạo địa điểm thành công`));
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

function* handleUpdateLocation({ payload }: IUpdateLocation) {
  const { id, dataUpdate } = payload;
  const response: IApiResponse = yield call(
    updateLocation,
    id,
    dataUpdate,
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal(`Cập nhật dữ liệu thành công`));
  } else {
    if (response.msg) {
      yield put(GlobalActions.openErrorInfoModal(`Lỗi ${response.status}\nChi tiết: ${response.msg}`));
    }
  }
}

//#endregion

//#region ========== WATCHER =================

function* watchCreateUser() {
  yield takeEvery(Types.MASTER_CREATE_TEST, safe(handleCreateUser));
}

function* watchGetData() {
  yield takeEvery(Types.MASTER_GET_TEST, safe(handleGetData));
}

function* watchUpdateData() {
  yield takeEvery(Types.MASTER_UPDATE_TEST, safe(handleUpdateData));
}

function* watchDeleteData() {
  yield takeEvery(Types.MASTER_DELETE_TEST, safe(handleDeleteData));
}

function* watchGetLocation() {
  yield takeEvery(Types.MASTER_GET_LOCATION, safe(handleGetLocation))
}

function* watchDeleteLocation() {
  yield takeEvery(Types.MASTER_DELETE_LOCATION, safe(handleDeleteLocation))
}

function* watchCreateLocation() {
  yield takeEvery(Types.MASTER_CREATE_LOCATION, safe(handleCreateLocation))
}

function* watchUpdateLocation() {
  yield takeEvery(Types.MASTER_UPDATE_LOCATION, safe(handleUpdateLocation))
}

//#endregion


export default function* masterSaga() {
  yield all([
    fork(watchCreateUser),
    fork(watchGetData),
    fork(watchUpdateData),
    fork(watchDeleteData),
    fork(watchGetLocation),
    fork(watchDeleteLocation),
    fork(watchCreateLocation),
    fork(watchUpdateLocation),
  ]);
}