import { logger } from "express-glass";
import jwt from "jsonwebtoken";
import moment from "moment";
import responseUtil from "../utils/Response";

let jwtidCounter = 0;
let blacklist = [];

const JwtService = {
  jwtSign: (body) => {
    try {
      logger().info("[JWT] Generating fastify JWT sign");

      const payload = JSON.stringify(body);

      jwtidCounter = jwtidCounter + 1;
      return jwt.sign({ payload }, process.env.SERVER_JWT_SECRET, {
        expiresIn: Number(process.env.SERVER_JWT_TIMEOUT),
        jwtid: jwtidCounter + "",
      });
    } catch (error) {
      logger().error("[JWT] Error during fastify JWT sign");
      throw error;
    }
  },

  jwtGetToken: (req, res, next) => {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        throw new Error("Not authorized, headers not provided");
      }
      const jwtToken = auth.split(" ")[1];
      req.auth = jwt.verify(jwtToken, process.env.SERVER_JWT_SECRET);
      next();
    } catch (error) {
      logger().error("[JWT] Error getting JWT token");
      responseUtil.fail(res, 401, error.message);
    }
  },

  jwtVerify: (token) => {
    try {
      if (process.env.SERVER_JWT !== "true")
        throw new Error("[JWT] JWT flag is not setted");

      return jwt.verify(
        token,
        process.env.SERVER_JWT_SECRET,
        (err, decoded) => {
          blacklist.forEach((element) => {
            if (
              element.jti === decoded.jti &&
              element.iat === decoded.iat &&
              element.exp === decoded.exp
            )
              throw err;
          });

          if (err != null) throw err;
          return decoded.payload;
        }
      );
    } catch (error) {
      logger().error("[JWT] Error getting JWT token for verify");
      throw error;
    }
  },

  jwtBlacklistToken: (token) => {
    try {
      while (
        blacklist.length &&
        moment().diff("1970-01-01 00:00:00Z", "seconds") > blacklist[0].exp
      ) {
        logger().info(
          `[JWT] Removing from blacklist timed out JWT with id ${blacklist[0].jti}`
        );
        blacklist.shift();
      }
      const { jti, exp, iat } = jwt.decode(token);
      logger().info(`[JWT] Adding JWT ${token} with id ${jti} to blacklist`);
      blacklist.push({ jti, exp, iat });
    } catch (error) {
      logger().error("[JWT] Error blacklisting fastify JWT token");
      throw error;
    }
  },
};

export default JwtService;
