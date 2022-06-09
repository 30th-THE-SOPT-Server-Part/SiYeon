import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * MongoDB URI
   */
  mongoURI: process.env.MONGODB_URI as string,

  /**
   * jwt secret
   */
  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * jwt algorithm
   */
  jwtAlgo: process.env.JWT_ALGO as string,

  /**
   * aws s3
   */
  s3AccessKey: process.env.S3_ACCESS_KEY as string,
  s3SecretKey: process.env.S3_SECRET_KEY as string,
  bucketName: process.env.BUCKET_NAME as string



};
//다 .env를 이용해 만든 변수들.
//.env는 최상단에 만들어서 몽고디비 유알아이 이런거 저장해놓고 가져와서 쓰기.
