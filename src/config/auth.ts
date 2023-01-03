
const authConfig = {
  secret: process.env.APP_SECRET,
  tokenExpiryTime: process.env.EXPIRE_TIME,
  redisServerPort: process.env.REDIS_PORT || 6379,
  redisServerURL: process.env.REDIS_URL,
  redisConnectionString: process.env.REDIS_URL_STR
}

export { authConfig }