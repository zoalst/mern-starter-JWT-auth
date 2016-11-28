// Auth Actions
import { REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './UserActions';
import { UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_FAILURE, LOAD_USER_PROPS} from './UserActions';

// Initial State
const initialState = {
  data: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
      
    case REGISTER_FAILURE:
      return {
        ...state,
      };
      
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.user,
      };

    case LOGIN_FAILURE:
      return {    
        ...state,
      };

    case LOGOUT:
      return {
        ...state,
        data: null,
      };

    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        data: action.user,
      };
      
    case UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
      };

    case LOAD_USER_PROPS:
      return {
        ...state,
        data: action.user,
      };

    default:
      return state;
  }
};

export const getUser = state => state.user.data;

// Export Reducer
export default UserReducer;