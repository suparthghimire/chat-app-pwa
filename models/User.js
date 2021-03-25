let users = [];

module.exports = {
  getUsers: () => users,
  getUser: (id) => users.find((user) => user.id === id),
  addUser: (user) => users.push(user),
  removeUser: (id) => {
    let userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
  },
  createUser: (username, id) => {
    let user = {};
    user.username = username;
    user.id = id;
    return user;
  },
};
