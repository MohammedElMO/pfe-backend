// import db from "./database/connction";
import express, { json, Request } from "express";
// import { json } from "stream/consumers";

const app = express();


app.get("/", (req, res) => {
  res.send({
    greet: "hello fronm the server",
  });
});



app.listen(3000, () => console.log("running the server..."));
