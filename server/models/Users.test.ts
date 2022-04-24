import Users from "./Users.js";

describe("find()", () => {
  it("should return the user if a user with a matching user id exists", () => {
    const user = Users.find("2725");
    expect(user).toEqual({
      id: "2725",
      username: "hermione",
      password: "granger",
    });
  });

  it("should return undefined if no user is found", () => {
    const user = Users.find("1234");
    expect(user).toBeUndefined();
  });
});

describe("isValidCredentials()", () => {
  it("should return the user that has the matching username and password", () => {
    const user = Users.findByCredentials("harry", "potter");
    expect(user).toEqual({
      id: "5976",
      username: "harry",
      password: "potter",
    });
  });

  it("should return undefined if no user is found", () => {
    const user = Users.findByCredentials("harry", "nogo");
    expect(user).toBeUndefined();
  });
});
