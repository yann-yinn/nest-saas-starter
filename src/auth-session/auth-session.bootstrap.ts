import * as session from 'express-session';
import * as connectMongodbSession from 'connect-mongodb-session';
const MongoDBStore = connectMongodbSession(session);
import { INestApplication } from '@nestjs/common';

console.log('rocess.env.AUTH_SESSION_SECRET', process.env.NODE_ENV);

/**
 * To be called in ./src/main.ts
 */
export function authSessionBootstrap(app: INestApplication): void {
  app.use(
    session({
      secret: <string>process.env.AUTH_SESSION_SECRET,
      resave: false,
      cookie: {
        path: '/',
        // javascript cannot access cookie from browser
        httpOnly: true,
        // cookie will be serve in httpS only
        secure: process.env.NODE_ENV === 'production' ? true : false,
        // in milliseconds. 24 * 60 * 60 * 1000 for one day.
        maxAge: 24 * 60 * 60 * 1000,
        // for which domains cookie will be automatically sent
        domain: process.env.DOMAIN,
        sameSite: 'strict',
      },
      saveUninitialized: false, // do not save if req.session is an empty object {}
      store: new MongoDBStore({
        uri: <string>process.env.MONGO_URL,
        collection: 'sessions',
      }),
    }),
  );
}
