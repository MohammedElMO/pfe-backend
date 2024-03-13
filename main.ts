import express, { json } from "express";
const app = express();
app.use(json);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(4000, () => console.log("running the server..."));

console.log("bobo");
