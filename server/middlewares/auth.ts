import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";

export const getUserId = (req: Request): string | Function => {
  const { authorization = "" } = req.headers;

  if (!RegExp(/^Bearer /).test(authorization))
    throw new Error("UnauthorizedError");
  const token = authorization.replace(/^Bearer /, "");

  const { sub: userId } = jwt.verify(token, JWT_SECRET);
  if (!userId) throw new Error("UnauthorizedError");

  return userId;
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    getUserId(req);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({
      message:
        "Unauthorized. This means you are either missing the JWT token, the token is not being passed the right way or your token has expired. If you restarted the server, you will need signin again and get another JWT token.",
    });
  }
};
