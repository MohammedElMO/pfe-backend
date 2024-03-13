import { Request, Response } from "express";

export function getUser(_: Request, res: Response) {
  res.send({
    isAutentificated: true,
  });
}

export function authentificateUser(req: Request, res: Response) {
  res.send("auth");
}
