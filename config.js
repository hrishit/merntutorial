module.exports = {
  serverPort: process.env.PORT || 8080,
  dbUrl:
    process.env.NODE_ENV === "production"
      ? "mongodb://hrishit:hrishit@cluster0-shard-00-00-sopqq.mongodb.net:27017/test"
      : "mongodb://localhost:27017/postbook",
  secretKey: "Secret key for jwt"
};
