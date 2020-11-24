import { error, success } from "consola";
import { ApolloServer } from "apollo-server-express";
import { DB, port, IN_PROD } from "./config";
import { typeDefs, resolvers } from "./graphql";
import * as AppModels from "./models";

import express from "express";
import mongoose from "mongoose";

//initialize the express application
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IN_PROD,
  context: {
    ...AppModels,
  },
});

const startApp = async () => {
  try {
    //connect to mongodb database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    success({
      message: `successfully connected with database`,
      badge: true,
    });

    //Inject ApolloServer
    server.applyMiddleware({
      app,
    });
    app.listen(port, () =>
      success({
        badge: true,
        message: `server started on port ${port}`,
      })
    );
  } catch (err) {
    error({
      message: err.message,
      badge: true,
    });
  }
};

startApp();
