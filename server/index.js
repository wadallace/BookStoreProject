/**
 * The server is for the Book Store project
 * @author AlbanyCanCode
 */
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import express from "express";

import authRouter from "./routes/authRouter.js";
import bookshelfRouter from "./routes/bookshelfRouter.js";
import bookSearchRouter from "./routes/bookSearchRouter.js";
import bookRouter from "./routes/bookRouter.js";

import fileNotFoundError from "./errors/fileNotFound.js";

const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());

// Error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(
      "Hey there. There could be a problem with your request or it could be that your instructors didn't write a fool-proof server. Check your request first. If you think it is OK, please copy and paste the stack trace below and send it your instructors."
    );
    console.error(err);
    console.log("\n");
    return res.status(500).send({
      message:
        "This is no fun. An unexpected error occurred that may be server related. Please take a look at the command line output.",
    });
  }
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/bookshelf", bookshelfRouter);
app.use("/api/book/search", bookSearchRouter);
app.use("/api/book", bookRouter);
app.use("/api/", authRouter);
app.all("/api/*", fileNotFoundError);

app.get("*", (req, res) => {
  if (fs.existsSync(path.resolve(__dirname, "../client/build", "index.html"))) {
    return res.sendFile(
      path.resolve(__dirname, "../client/build", "index.html")
    );
  }
  const text =
    "Its running!\nTo use the API, please refer to the Project README.md.";
  res.send(text);
});

const server = app.listen(PORT, () => {
  console.log(
    `\nYour server is running on http://localhost:${server.address().port}/`
  );
  console.log(`\nPress ctrl+c to stop\n`);
});
