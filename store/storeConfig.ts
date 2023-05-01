import { createStore, combineReducers } from "redux";
import favoritesReducer from "./reducers/favorites";

const reducers = combineReducers({
  favorites: favoritesReducer,
});

const storeConfig = () => {
  return createStore(reducers);
};

export default storeConfig;
