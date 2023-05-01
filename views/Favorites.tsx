import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Movie, MovieDict } from "../types";
import MovieCard from "../components/movieCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

interface FavoritesI {
  favorites: MovieDict;
}

const Favorites = ({ favorites }: FavoritesI) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        {Object.values(favorites) && Object.values(favorites).length ? (
          Object.values(favorites).map((movie) => {
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

const mapStateToProps = (state: any) => {
  return { favorites: state.favorites };
};

export default connect(mapStateToProps, null)(Favorites);
