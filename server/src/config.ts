import { config as readEnvConfig } from 'dotenv';

readEnvConfig();

const definedEnvs = Object.keys(process.env);

const getEnv = (envName: string, required = false) => {
  if (required && !definedEnvs.includes(envName)) {
    throw new Error(`${envName} missing`);
  }

  return process.env[envName];
};

export default {
  mongoUrl: getEnv('MONGO_URL') || 'mongodb://localhost:27017/guy-bean',
  mongooseDebug: !!getEnv('MONGOOSE_DEBUG'),
  port: Number(getEnv('PORT')) || 8000,
  log: {
    level: getEnv('LEVEL') || 'info',
    silent: Boolean(getEnv('SILENT')),
  },
  cors: {
    origins: getEnv('CORS_ORIGINS')?.split(/,/) || true,
  },
  redis: {
    url: getEnv('REDIS_HOST') || '127.0.0.1',
    port: Number(getEnv('REDIS_PORT')) || 6379,
  },
  blockchainInfo: {
    baseURL: 'https://blockchain.info/',
  },
};
