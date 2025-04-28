import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getUsers } from "./deleteUser.js";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Admin Page
export default function admin(req, res) {
  const users = getUsers();
  const adminPath = path.join(__dirname, "../views/admin.html");
  
  fs.readFile(adminPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading admin template:", err);
      return res.status(500).send("Error loading admin page");
    }

    // Generate the user rows dynamically
    const userRows = users.map(user => `
      <tr>
        <td>${user.username}</td>
        <td>
          <a href="/admin/delete?username=${user.username}" class="delete-link">Delete</a>
        </td>
      </tr>
    `).join('');

    // Create the full dynamic content
    const dynamicContent = `
      <tr>
        <th>Username</th>
        <th>Action</th>
      </tr>
      ${userRows}
    `;

    // Replace only the marked section
    const updatedContent = data.replace(
      /<!-- DYNAMIC_CONTENT_START -->[\s\S]*?<!-- DYNAMIC_CONTENT_END -->/,
      `<!-- DYNAMIC_CONTENT_START -->
      ${dynamicContent}
      <!-- DYNAMIC_CONTENT_END -->`
    );

    res.send(updatedContent);
  });
}