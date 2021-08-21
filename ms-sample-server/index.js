const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    sayHello(name: String!): String!
    total: Int!
  }
`;

const resolvers = {
  Query: {
    // Resolver params:  parent, args, context, info
    sayHello: (_, { name }) => `hello ${name}`,
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
