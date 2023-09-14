import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import fs from 'fs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema'

import userResolvers from './resolvers/user.mjs'
import userTypeDefs from './typeDefs/user.mjs'

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
})

const app = express()
let httpServer;

if (process.env.ENVIRONMENT === 'production') {
  httpServer = http.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/moviese.at/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/moviese.at/fullchain.pem'),
  }, app)
} else {
  httpServer = http.createServer(app)
}

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/graphql',
  cors({ origin: ['https://www.moviese.at', 'https://moviese.at/graphql', 'https://studio.apollographql.com'], credentials: true }),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4100 }, resolve));
console.log(`🚀 Server ready at http://localhost:4100`);
