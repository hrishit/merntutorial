module.exports = {
  serverPort: process.env.PORT || 8080,
  dbUrl:
    process.env.NODE_ENV === "production"
      ? "mongodb+srv://hrishit:hrishit@cluster0-sopqq.mongodb.net/test?retryWrites=true&w=majority"
      : "mongodb://localhost:27017/postbook",
  secretKey: "Secret key for jwt"
};
