module.exports = {
  port: process.env.PORT || 9001 ,
  jwt: {
    accessSecret: process.env.JWT_SECRET_ACCESS,
    accessTokenLife: "7d",
    // refreshSecret: process.env.JWT_SECRET_REFRESH,
    // refreshTokenLife: "1y",
  },
};
