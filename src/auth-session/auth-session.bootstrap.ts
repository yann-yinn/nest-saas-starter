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
      secret: 'my-secret',
      resave: false,
      cookie: {
        path: '/',
        // javascript cannot access cookie from browser
        httpOnly: true,
        // cookie will be serve in httpS only
        secure: true,
        // by default, cookie will expire when the browser is closed
        maxAge: undefined,
        // our API might be located to another domain than our front-end
        sameSite: 'lax',
      },
      saveUninitialized: false, // do not save if req.session is an empty object {}
      store: new MongoDBStore({
        uri: <string>process.env.MONGO_URL,
        collection: 'sessions',
      }),
    }),
  );
}
