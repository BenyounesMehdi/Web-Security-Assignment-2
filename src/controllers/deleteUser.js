let users = [{ username: "wiener" }, { username: "carlos" }];

export const deleteUser = (req, res) => {
  const username = req.query.username;

  const isExit = users.find((user) => user.username === username);
  if (!isExit) {
    return res.status(404).send("User not found.");
  }

  if (!username) {
    return res.status(400).send("Missing username.");
  }

  // Remove the user
  users = users.filter((user) => user.username !== username);

  console.log(`Deleted user: ${username}`);
  res.send(`<p>User <strong>${username}</strong> has been deleted.</p>`);
};

// Export the users array to be used by admin controller
export const getUsers = () => users;
