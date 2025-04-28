import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import router from "./routes/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 600000, // Set session lifetime (10 minutes)
    },
  })
);

// Block direct access to /admin and /admin/delete
app.use((req, res, next) => {
  const originalUrl = req.originalUrl;
  const xOriginalUrl = req.headers["x-original-url"];

  // If request is direct to /admin or /admin/delete and doesn't include X-Original-URL
  if (
    (originalUrl === "/admin" || originalUrl.startsWith("/admin/delete")) &&
    !xOriginalUrl
  ) {
    return res.status(403).send("Access denied.");
  }

  next();
});

// Check if X-Original-URL is present and serve the spoofed route
// app.use((req, res, next) => {
//   const spoofedUrl = req.headers["x-original-url"];
//   if (spoofedUrl) {
//     req.url = spoofedUrl;
//   }
//   next();
// });

app.use((req, res, next) => {
  const spoofedUrl = req.headers["x-original-url"];
  if (spoofedUrl) {
    const parsedSpoofedUrl = new URL(spoofedUrl, `http://${req.headers.host}`);
    const parsedOriginalUrl = new URL(
      req.originalUrl,
      `http://${req.headers.host}`
    );

    // Copy original search params if they exist
    parsedSpoofedUrl.search = parsedOriginalUrl.search;

    req.url = parsedSpoofedUrl.pathname + parsedSpoofedUrl.search;
  }
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log("Servers is running on port " + PORT);
});
