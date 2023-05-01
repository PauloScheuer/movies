import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Movie, MovieDict } from "../types";
import { Feather } from "@expo/vector-icons";
import { Dispatch } from "redux";
import { Action } from "../store/consts";
import {
  addToFavorites,
  removeFromFavorites,
} from "../store/actions/favorites";
import { connect } from "react-redux";

interface MovieCardI {
  id: string;
  original_title: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  overview: string;
  onAddToFavorites: (movie: Movie) => void;
  onRemoveFromFavorites: (id: string) => void;
  favorites: MovieDict;
}

const MovieCard = ({
  id,
  original_title,
  poster_path,
  vote_average,
  release_date,
  overview,
  onAddToFavorites,
  onRemoveFromFavorites,
  favorites,
}: MovieCardI) => {
  return (
    <View style={styles.container}>
      <FlipCard flipHorizontal={true} flipVertical={false}>
        <>
          <Image
            style={styles.img}
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          />
        </>
        <>
          <Text style={styles.data}>Rate: {vote_average}</Text>
          <Text style={styles.data}>Release Date: {release_date}</Text>
          <Text style={styles.data}>Overview: {overview}</Text>
        </>
      </FlipCard>
      <View style={styles.bottom}>
        <Text style={styles.title}>{original_title}</Text>
        <Feather
          name="star"
          size={24}
          color={favorites.hasOwnProperty(id) ? "#457DFF" : "#333"}
          onPress={() => {
            if (favorites.hasOwnProperty(id)) {
              onRemoveFromFavorites(id);
              return;
            }
            onAddToFavorites({
              id,
              original_title,
              poster_path,
              vote_average,
              release_date,
              overview,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 12,
    backgroundColor: "#e4e4e4",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginBottom: 24,
  },
  img: {
    width: "100%",
    height: 500,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
  },
  data: {
    color: "#333",
    fontSize: 12,
    fontWeight: "500",
    padding: 20,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});

const mapStateToProps = (state: any) => {
  return { favorites: state.favorites };
};
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onAddToFavorites: (movie: Movie) => {
      dispatch(addToFavorites(movie));
    },
    onRemoveFromFavorites: (id: string) => {
      dispatch(removeFromFavorites(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
