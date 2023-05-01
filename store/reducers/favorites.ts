import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie, MovieDict } from "../../types";
import {
  FAVORITE_ADDED,
  FAVORITE_REMOVED,
  Action,
  FAVORITE_INITIALIZED,
} from "../consts";

const initialState: MovieDict = {};

const reducer = (state: MovieDict = initialState, action: Action) => {
  const originalState = state;
  switch (action.type) {
    case FAVORITE_ADDED:
      const key = (action.payload as Movie).id;
      return {
        ...originalState,
        [key]: action.payload,
      };
    case FAVORITE_REMOVED:
      const newState = { ...originalState };
      delete newState[action.payload as string];
      return {
        ...newState,
      };
    case FAVORITE_INITIALIZED:
      return { ...(action.payload as MovieDict) };
    default:
      return originalState;
  }
};

export default reducer;
