import { IMasterState, MasterActionsType, Types } from './master.types';

const initialState: IMasterState = {
  dataTest: []
};

export default function MasterReducers(
  state = initialState,
  action: MasterActionsType,
): IMasterState {
  switch (action.type) {
    case Types.MASTER_GET_TEST_SUCCESS: {
      const {dataTest} = action.payload;
      return {...state, dataTest: dataTest}
    }
    default:
      return state;
  }
}
