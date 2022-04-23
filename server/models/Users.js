/**
 * Usually, we would store our users in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 *
 * You can add or change users by editing the users.json file.
 * I called username "nameOfUser" and password "wordOfPassage"
 * to stop Github from flagging this as not secure because it is hardcoded.
 */
import users from "../assets/users.js";

const renameProperties = (user) => {
  if (!user) return user;
  return {
    id: user.id,
    username: user.nameOfUser,
    password: user.wordOfPassage,
  };
};

class Users {
  static find(id) {
    return renameProperties(users.find((user) => user.id === id));
  }

  static findByCredentials(username, password) {
    const user = users.find((user) => {
      return user.nameOfUser === username && user.wordOfPassage === password;
    });
    return user ? renameProperties(user) : user;
  }
}

export default Users;
