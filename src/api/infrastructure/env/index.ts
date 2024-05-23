export const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  secret: process.env.JWT_SECRET_KEY,
  accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRES,
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRES,
  salt: process.env.SALT,
};
