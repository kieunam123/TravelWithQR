import { IMasterState, MasterActionsType, Types } from './master.types';

const initialState: IMasterState = {
  User: [],
  locations: [],
  places: [],
};

export default function MasterReducers(
  state = initialState,
  action: MasterActionsType,
): IMasterState {
  switch (action.type) {
    case Types.MASTER_GET_TEST_SUCCESS: {
      const {User} = action.payload;
      return {...state, User: User}
    }
    case Types.MASTER_GET_LOCATION_SUCCESS: {
      const {locations} = action.payload;
      return {...state, locations: locations}
    }
    case Types.MASTER_GET_PLACES_SUCCESS: {
      const {places} = action.payload;
      return {...state, places: places}
    }
    default:
      return state;
  }
}
