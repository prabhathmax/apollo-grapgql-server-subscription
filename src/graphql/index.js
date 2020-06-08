import { gql, makeExecutableSchema } from 'apollo-server';
import merge from 'lodash.merge';
import account from './account';
import post from './post';

const defaultTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const createSchema = () => {
  return makeExecutableSchema({
    typeDefs: [defaultTypeDefs, account.typeDefs, post.typeDefs],
    resolvers: merge({}, account.resolvers, post.resolvers),
  });
};

export default createSchema;
