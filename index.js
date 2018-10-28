const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Post {
    id: Int
    title: String
    author: String
  }
  
  type Comment {
    id: Int
    body: String
    postId: String
  }
  
  type Profile {
    name: String
  }

  input PostIn {
    title: String
    author: String
  }

  input CommentIn {
    body: String
    postId: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    posts: [Post]
    comments: [Comment]
    profile: Profile
  }

  type Mutation {
    addPost(data: PostIn):Post
    addComment(data: CommentIn):Comment
    editProfile(name: String):Profile
  }
`;

async function restGetData(url) {
    var res
    try {
        const response = await axios.get(url);
        res = response.data
    } catch (error) {
        console.error(error);
    }
    console.log(res);
    return res
}

async function restPostData(url, data) {
    var res
    try {
        const response = await axios.post(url, data);
        res = response.data
    } catch (error) {
        console.error(error);
    }
    console.log(res);
    return res
}

async function restPutData(url, data) {
    var res
    try {
        const response = await axios.put(url, data);
        res = response.data
    } catch (error) {
        console.error(error);
    }
    console.log(res);
    return res
}

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        posts: () => restGetData('http://localhost:3000/posts'),
        comments: () => restGetData('http://localhost:3000/comments'),
        profile: () => restGetData('http://localhost:3000/profile'),
    },
    Mutation: {
        addPost: (obj, args, context, info) => restPostData('http://localhost:3000/posts', args.data),
        addComment: (obj, args, context, info) => restPostData('http://localhost:3000/comments', args.data),
        editProfile: (obj, args, context, info) => restPutData('http://localhost:3000/profile', { name: args.name }),
    }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});