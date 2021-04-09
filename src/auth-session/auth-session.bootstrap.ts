import * as session from 'express-session';
import * as connectMongodbSession from 'connect-mongodb-session';
const MongoDBStore = connectMongodbSession(session);
import { INestApplication } from '@nestjs/common';

/**
 * To be called in ./src/main.ts
 */
export function authSessionBootstrap(app: INestApplication): void {
  app.use(
    session({
      // Changing the secret value will invalidate all existing sessions.
      // In order to rotate the secret without invalidating sessions,
      // provide an array of secrets, with the new secret as first element of the array,
      // and including previous secrets as the later elements.
      secret: [<string>process.env.AUTH_SESSION_SECRET],
      // note sure about this one.
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
        // Most secured option is "strict". But "lax" still mitigates some of CSRF attacks
        // because it does *not* send cookie on POST cross-origins request.
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
