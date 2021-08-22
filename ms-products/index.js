const { ApolloServer, gql } = require('apollo-server');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const typeDefs = loadFilesSync(path.join(__dirname, 'schema/**/*.gql'));

const resolvers = {
  Query: {
    sample: () => 20,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(4005)
  .then(({ url }) => console.log(`ms-products started at ${url}`));
