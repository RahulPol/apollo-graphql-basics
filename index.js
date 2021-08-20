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

server.listen().then(({ url }) => console.log(`server started on ${url}`));
