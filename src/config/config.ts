import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = `mongodb://localhost:27017/jobsupport_db`;
const SERVER_PORT = 5000;
const JWT_SECRET = '0x55d398326f99059fF775485246999027B3197955 ';

const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  jwtSecret: {
    key: JWT_SECRET,
  },
};

export default config;
