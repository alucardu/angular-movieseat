import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import fs from 'fs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cookieParser from 'cookie-parser';
import context from './context.mjs';
import 'dotenv/config'

import userResolvers from './resolvers/user.mjs'
import userTypeDefs from './typeDefs/user.mjs'
import movieResolvers from './resolvers/movies.mjs';
import movieTypeDefs from './typeDefs/movies.mjs';
import notificationResolvers from './resolvers/notification.mjs';
import notificationDefs from './typeDefs/notification.mjs';
import reviewTypeDefs from './typeDefs/reviews.mjs'
import reviewResolvers from './resolvers/review.mjs';

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, movieTypeDefs, notificationDefs, reviewTypeDefs],
  resolvers: [userResolvers, movieResolvers, notificationResolvers, reviewResolvers],
})

let httpServer;
let corsOrigin
const app = express()

if (process.env.ENVIRONMENT === 'production') {
  console.log('env: production')
  corsOrigin = ["http://localhost", "https://www.moviese.at", "https://moviese.at"],
  httpServer = http.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/moviese.at/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/moviese.at/fullchain.pem'),
  }, app)
} else {
  console.log('env: development')
  corsOrigin = true
  httpServer = http.createServer(app)
}

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(
  '/graphql',
  cookieParser(),
  cors(corsOptions),
  bodyParser.json(),
  expressMiddleware(server, {
    context
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4100 }, resolve));
console.log(`🚀 Server ready at http://localhost:4100`);
