import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie, MovieDict } from "../../types";
import {
  FAVORITE_ADDED,
  FAVORITE_REMOVED,
  Action,
  FAVORITE_INITIALIZED,
} from "../consts";

const addToLocalStorageFavorites = async ({
  id,
  original_title,
  poster_path,
  vote_average,
  release_date,
  overview,
}: Movie) => {
  const savedData = await AsyncStorage.getItem("favorites");
  const favorites = savedData ? JSON.parse(savedData) : {};
  if (favorites.hasOwnProperty(id)) {
    return;
  }

  const newFavorites = { ...favorites };
  newFavorites[id] = {
    id,
    original_title,
    poster_path,
    vote_average,
    release_date,
    overview,
  };
  await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
};

const removeFromLocalStorageFavorites = async (id: string) => {
  const savedData = await AsyncStorage.getItem("favorites");
  const favorites = savedData ? JSON.parse(savedData) : {};
  if (!favorites.hasOwnProperty(id)) {
    return;
  }

  const newFavorites = { ...favorites };
  delete newFavorites[id];

  await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
};
export const addToFavorites = (movie: Movie): Action => {
  addToLocalStorageFavorites(movie);
  return {
    type: FAVORITE_ADDED,
    payload: movie,
  };
};

export const removeFromFavorites = (id: string): Action => {
  removeFromLocalStorageFavorites(id);
  return {
    type: FAVORITE_REMOVED,
    payload: id,
  };
};

export const initializeFavorites = (favorite: MovieDict): Action => {
  return {
    type: FAVORITE_INITIALIZED,
    payload: favorite,
  };
};
