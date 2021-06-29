import { gql, PubSub } from 'apollo-server';

const POST_ADDED = 'POST_ADDED';
const pubsub = new PubSub();

const typeDefs = gql`
  type Post {
    author: String
    comment: String
  }
  extend type Mutation {
    addPost(author: String, comment: String): Post
  }
  extend type Subscription {
    postAdded: Post
  }
`;

const resolvers = {
  Mutation: {
    addPost(_, { info }) {
      pubsub.publish(POST_ADDED, { postAdded: info });
      return {
        author: 'auther added',
        comment: 'comment added',
      };
    },
  },
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
};

export default { typeDefs, resolvers };
