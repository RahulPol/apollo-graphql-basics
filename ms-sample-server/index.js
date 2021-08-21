const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    total: Int!
  }
`;

const resolvers = {
  Query: {
    total: () => 10,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(4003)
  .then(({ url }) => console.log(`ms-sample-server started on ${url}`));
