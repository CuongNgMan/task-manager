const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  useFindAndModify: false
};

// module.exports = {
//   DB: {
//     CONNECTION_STRING: process.env.MONGODB_URL,
//     CONNECT_OPTIONS: CONNECT_OPTIONS
//   },
//   APP: {
//     PORT: process.env.__PORT__
//   },
//   twitter: {},
//   github: {},
//   linkedin: {},
//   google: {}
// };

export const production = {
  DB: {
    CONNECTION_STRING: process.env.MONGODB_URL,
    CONNECT_OPTIONS: CONNECT_OPTIONS
  },
  APP: {
    PORT: process.env.__PORT__
  },
  twitter: {},
  github: {},
  linkedin: {},
  google: {}
};
