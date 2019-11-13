module.exports = {
  serverPort: process.env.PORT || 8080,
  dbUrl:
    process.env.NODE_ENV === "production"
      ? ""
      : "mongodb://localhost:27017/postbook",
  secretKey: "Secret key for jwt"
};
