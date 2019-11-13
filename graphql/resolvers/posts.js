const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      context.pubsub.publish("NEW_POST", {
        newPost: post
      });
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.delete();
          return "Post was deleted succesfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context) {
      const { userName } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find(like => like.userName === userName)) {
            post.likes = post.likes.filter(like => like.userName !== userName);
          } else {
            post.likes.unshift({
              createdAt: new Date().toISOString(),
              userName: userName
            });
          }

          await post.save();
          return post;
        } else {
          throw new UserInputError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Subscription: {
    newPost: {
      subscribe(_, __, { pubsub }) {
        return pubsub.asyncIterator("NEW_POST");
      }
    }
  }
};
