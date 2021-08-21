const { RESTDataSource } = require('apollo-datasource-rest');
const _ = require('lodash');

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.MOVIE_ENDPOINT;
  }

  willSendRequest(request) {
    request.params.set('apiKey', process.env.API_KEY);
  }

  async getMovieById(imdbID) {
    const movie = await this.get('/', { i: imdbID });

    // TODO: Need to handle error in correct way
    if (movie.error) throw new Error(movie.error);

    return _.mapKeys(movie, (v, k) => _.camelCase(k));
  }

  async getMovieByTitle(title) {
    const movie = await this.get('/', { t: title });

    // TODO: Need to handle error in correct way
    if (movie.Error) throw new Error(movie.Error);

    console.log(movie);

    return _.mapKeys(movie, (v, k) => _.camelCase(k));
  }
}

module.exports = MovieAPI;
