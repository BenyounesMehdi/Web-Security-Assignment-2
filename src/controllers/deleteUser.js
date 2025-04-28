export const deleteUser = (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).send("Missing username.");
  }

  console.log(`Deleted user: ${username}`);
  res.send(`<p>User <strong>${username}</strong> has been deleted.</p>`);
};
