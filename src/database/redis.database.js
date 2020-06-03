import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

const REDIS_PORT = process.env.PORT || 6379;

const redisClient = redis.createClient(REDIS_PORT);

export default redisClient;