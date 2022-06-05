// import { readFileSync } from 'fs';
// import * as yaml from 'js-yaml';
// import { join } from 'path';
// const YAML_CONFIG_FILENAME = 'config.yaml';
const { env } = process;
// export default registerAs('database', () => ({
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT || 5432,
// }));

//引入官网的demo数据库，使用的时候需要将ip添加到白名单
export default () => {
  // const configYML = yaml.load(
  //   readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  // ) as Record<string, any>;
  const config = {
    // port: parseInt(env.PORT, 10) || 3000,
    // mongodb: {
    //   uri: String(env.MONGODB_URI),
    //   dbName: String(env.MONGODB_DBNAME),
    //   replicaSet: env.MONGODB_REPLICA_SET
    //     ? String(env.MONGODB_REPLICA_SET)
    //     : undefined,
    //   authSource: String(env.MONGODB_AUTH_SOURCE),
    //   username: env.MONGODB_USERNAME,
    //   password: env.MONGODB_PASSWORD,
    //   // host: env.DATABASE_HOST,
    //   // port: parseInt(env.DATABASE_PORT, 10) || 5432,
    // },
    HTTP_TIMEOUT: parseInt(env.HTTP_TIMEOUT, 10),
    HTTP_MAX_REDIRECTS: parseInt(env.HTTP_MAX_REDIRECTS, 10),
    path: 'COM3',
    baudRate: 115200,
    autoOpen: false,
  };
  return config;
};
