import {all, fork} from 'redux-saga/effects';
import globalSaga from './global/global.saga';
import masterSaga from './master/master.sagas';

export default function* rootSaga() {
    yield all ([
        fork(globalSaga),
        fork(masterSaga)
    ]);
}