export type Movie = {
  original_title: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  overview: string;
  id: string;
};

export type MovieDict = {
  [key: string]: Movie;
};
