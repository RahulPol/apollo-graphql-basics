const { ApolloServer, gql, ApolloError } = require('apollo-server');
require('dotenv').config();

const MovieAPI = require('./datasources/MovieAPI');

const typeDefs = gql`
  type Movie {
    title: String
    year: Int
    rated: String
    director: String
    actors: [String]!
    imdbId: String
    poster: String
  }

  type Query {
    getMovieById(imdbID: String): Movie
    getMovieByTitle(title: String): Movie
  }
`;

const resolvers = {
  Query: {
    getMovieById: (_, { imdbID }, { dataSources }) => {
      try {
        return dataSources.moviesAPI.getMovieById(imdbID);
      } catch (ex) {
        throw new ApolloError(ex.message, ex.code);
      }
    },

    getMovieByTitle: (_, { title }, { dataSources }) => {
      try {
        return dataSources.moviesAPI.getMovieByTitle(title);
      } catch (ex) {
        throw new ApolloError(ex.message, ex.code);
      }
    },
  },
};

// TODO: checkout how to use redis to cache the result
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    moviesAPI: new MovieAPI(),
  }),
});

server
  .listen(4004)
  .then(({ url }) => console.log(`ms-movies started on ${url}`));
