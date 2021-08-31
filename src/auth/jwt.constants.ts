
require("dotenv").config()

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: Number(process.env.JWT_IXPIRESIN),
}