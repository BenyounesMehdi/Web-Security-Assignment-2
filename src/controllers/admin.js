import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Home Page
export default function admin(req, res) {
  const homePath = path.join(__dirname, "../views/admin.html");
  res.sendFile(homePath, (err) => {
    if (err) {
      console.error("Error sending admin page:", err);
      res.status(500).send("Error loading admin page");
    }
  });
}
