import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { getUserId } from "./auth";

describe("getUserId", () => {
  it("should return the user id from a JWT token inside of a request", () => {
    const token = jwt.sign({ sub: "1234" }, JWT_SECRET);
    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as any as Request;

    const userId = getUserId(mockRequest);
    expect(userId).toBe("1234");
  });

  it("should throw an error if the jwt token is invalid", () => {
    const fn = () => {
      const token = "invalid";
      const mockRequest = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as any as Request;

      getUserId(mockRequest);
    };

    expect(fn).toThrow();
  });

  it("should throw an error if the token is not in the Authorization header of the request", () => {
    const fn = () => {
      const mockRequest = {} as Request;
      getUserId(mockRequest);
    };

    expect(fn).toThrow();
  });
});
