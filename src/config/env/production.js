const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  useFindAndModify: false
};

export const production = {
  DB: {
    CONNECTION_STRING: process.env.MONGODB_URL,
    CONNECT_OPTIONS: CONNECT_OPTIONS
  },
  APP: {
    PORT: process.env.PORT
  },
  twitter: {},
  github: {},
  linkedin: {},
  google: {}
};
