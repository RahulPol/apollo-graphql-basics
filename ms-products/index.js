const { ApolloServer, gql } = require('apollo-server');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const products_data = require('./products.json').data;

const typeDefs = loadFilesSync(path.join(__dirname, 'schema/**/*.gql'));

const resolvers = {
  Product: {
    __resolveType: (obj) => {
      if (obj.gtin) return 'Movie';
      if (obj.vac) return 'Book';
      return null;
    },
  },
  Query: {
    sample: () => 20,
    products: () => products_data.map((p) => p),
    product: (_, { id }) => products_data.find((p) => p.id === id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(4005)
  .then(({ url }) => console.log(`ms-products started at ${url}`));
