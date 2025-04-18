import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Home Page
export default function home(req, res) {
  const homePath = path.join(__dirname, "../views/home.html");
  res.sendFile(homePath, (err) => {
    if (err) {
      console.error("Error sending home page:", err);
      res.status(500).send("Error loading home page");
    }
  });
}
