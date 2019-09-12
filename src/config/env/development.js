const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.__DB_NAME__ || "task-manager-api";
const DB_PORT = process.env.__DB_PORT__ || "27017";

const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  useFindAndModify: false
};

const CONNECTION_STRING = `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

export const development = {
  DB: {
    CONNECTION_STRING,
    CONNECT_OPTIONS: CONNECT_OPTIONS
  },
  APP: {
    PORT: PORT
  },
  twitter: {},
  github: {},
  linkedin: {},
  google: {}
};
