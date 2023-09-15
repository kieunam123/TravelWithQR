import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ICreateTest, IDeleteTest, IGetTest, IUpdateTest, Types } from "./master.types";
import { createTestData, deleteDataTest, getDataTest, updateDataTest } from "~/apis/master.service";
import { IApiResponse, ISampleObj } from "~/apis/types.service";
import GlobalActions from "../global/global.actions";
import MasterActions from "./master.actions";
import { safe } from "../saga.helpers";

//#region ================== WORKER ====================

function* handleCreateTest({ payload: ISampleObj }: ICreateTest) {
  const response: IApiResponse = yield call(
    createTestData,
    ISampleObj
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal(`Tạo data thành công`));
  }
}

function* handleGetData({ payload }: IGetTest) {
  const { id } = payload;
  const response: IApiResponse = yield call(
    getDataTest,
    id,
  );
  const dataTest: ISampleObj[] = response.data.map((item) => {
    return {
      ...item,
      isUpdate: false,
    }
  })
  if (response.status === 'Success') {
    yield put(MasterActions.getDataTestSuccess(dataTest));
  }
}

function* handleUpdateData({ payload }: IUpdateTest) {
  const { id, dataUpdate } = payload;
  const response: IApiResponse = yield call(
    updateDataTest,
    id,
    dataUpdate,
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal(`Cập nhật dữ liệu thành công`));
  }
}

function* handleDeleteData({ payload }: IDeleteTest) {
  const { id } = payload;
  const response: IApiResponse = yield call(
    deleteDataTest,
    id,
  );
  if (response.status === 'Success') {
    yield put(GlobalActions.openErrorInfoModal('Xoá dữ liệu thành công'));
  }
}

//#endregion

//#region ========== WATCHER =================

function* watchCreateTest() {
  yield takeEvery(Types.MASTER_CREATE_TEST, safe(handleCreateTest));
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

//#endregion


export default function* masterSaga() {
  yield all([
    fork(watchCreateTest),
    fork(watchGetData),
    fork(watchUpdateData),
    fork(watchDeleteData),
  ]);
}