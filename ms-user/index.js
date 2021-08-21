const { ApolloServer, gql, ApolloError } = require('apollo-server');

const users = require('./dummyUsers.json');

const typeDefs = gql`
  type User {
    id: ID!
    title: String
    firstName: String
    lastName: String
  }

  type Query {
    getAllUsersName: [String!]
    getUserRole(userName: String): String!
  }
`;

const resolvers = {
  Query: {
    getAllUsersName: () => users.data.map((user) => user.firstName),
    getUserRole: (_, { userName }, context) => {
      if (context.user.isAdmin) {
        const user = users.data.find((user) => user.firstName === userName);
        if (!user) throw new ApolloError(`No User found for ${userName}`, 400);

        return user.role;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization;
    const user = users.data.find((user) => user.firstName === authorization);

    if (!user) throw new ApolloError('Unauthorized user', 404);

    return {
      user,
    };
  },
});

server.listen(4002).then(({ url }) => console.log(`ms-user started at ${url}`));
