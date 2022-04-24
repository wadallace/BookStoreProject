/**
 * The server is for the Book Store project
 * @author AlbanyCanCode
 */
import { resolve } from "path";
import { existsSync } from "fs";
import express, { Request, Response, NextFunction } from "express";

import authRouter from "./routes/authRouter";
import bookshelfRouter from "./routes/bookshelfRouter";
import bookSearchRouter from "./routes/bookSearchRouter";
import bookRouter from "./routes/bookRouter";

import fileNotFoundError from "./errors/fileNotFound";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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

app.use(express.static(resolve("../client/build")));

app.use("/api/bookshelf", bookshelfRouter);
app.use("/api/book/search", bookSearchRouter);
app.use("/api/book", bookRouter);
app.use("/api/", authRouter);
app.all("/api/*", fileNotFoundError);

app.get("*", (_, res: Response) => {
  if (existsSync(resolve("../client/build", "index.html"))) {
    return res.sendFile(resolve("../client/build", "index.html"));
  }
  const text =
    "Its running!\nTo use the API, please refer to the Project README.md.";
  res.send(text);
});

app.listen(PORT, () => {
  console.log(`\nYour server is running on http://localhost:${PORT}/`);
  console.log(`\nPress ctrl+c to stop\n`);
});
