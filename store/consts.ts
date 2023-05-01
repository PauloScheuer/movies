import { Movie, MovieDict } from "../types";

const FAVORITE_INITIALIZED = "FAVORITE_INITIALIZED";
const FAVORITE_ADDED = "FAVORITE_ADDED";
const FAVORITE_REMOVED = "FAVORITE_REMOVED";

type Action = {
  type: string;
  payload: Movie | MovieDict | string;
};

export { FAVORITE_ADDED, FAVORITE_REMOVED, FAVORITE_INITIALIZED, Action };
