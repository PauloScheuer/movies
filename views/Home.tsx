import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/searchBar";
import { Dispatch, useEffect, useState } from "react";
import api from "../services/api";
import { API_KEY } from "@env";
import MovieCard from "../components/movieCard";
import { Movie, MovieDict } from "../types";
import { initializeFavorites } from "../store/actions/favorites";
import { connect } from "react-redux";
import { Action } from "../store/consts";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HomeI {
  onInitialize: (favorites: MovieDict) => void;
}

const Home = ({ onInitialize }: HomeI) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      const savedData = await AsyncStorage.getItem("favorites");
      const favorites = savedData ? JSON.parse(savedData) : {};
      onInitialize(favorites);
    };

    const searchPopularMovies = async () => {
      try {
        const res = await api.get(
          `/movie/popular?api_key=${process.env.API_KEY}`
        );
        setPopularMovies(res.data.results);
      } catch (error) {
        alert("Error");
      }
    };

    searchPopularMovies();
    initializeData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchedMovies([]);
    }
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const res = await api.get(
        `/search/movie?api_key=${process.env.API_KEY}&query=${query}`
      );
      setSearchedMovies(res.data.results);
    } catch (error) {
      alert("Error");
    }
  };

  const getMovies = () => {
    return searchQuery === "" ? popularMovies : searchedMovies;
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Search Movies</Text>
        <SearchBar
          onSubmitSearch={handleSearch}
          onClearSearch={() => setSearchQuery("")}
        />
        {getMovies().length ? (
          getMovies().map((movie) => {
            return (
              <MovieCard
                original_title={movie.original_title}
                id={movie.id}
                key={movie.id}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                overview={movie.overview}
              />
            );
          })
        ) : (
          <Text style={styles.notFound}>Nenhum filme encontrado :(</Text>
        )}
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onInitialize: (favorites: MovieDict) => {
      dispatch(initializeFavorites(favorites));
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#eee",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    marginTop: 36,
    fontWeight: 800,
    borderBottomWidth: 2,
    borderBottomColor: "#457DFF",
  },
  notFound: {
    marginTop: 32,
  },
});
