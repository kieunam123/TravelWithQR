import {combineReducers} from 'redux';
import {Types} from './global/global.types';
import global from './global/global.reducers';
import master from './master/master.reducers'

const appReducer = combineReducers({
   global,
   master,
});

const rootReducer = (state, action) => {
    if (action.type === Types.GLOBAL_RESET_APP_STATE) {
      state = undefined;
    }
    return appReducer(state, action);
  };
  
  export default rootReducer;
  
  export type RootState = ReturnType<typeof rootReducer>;