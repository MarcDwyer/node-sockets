import { Express } from "express";

export const setRoutes = (app: Express) => {
  app.get("/api/project", (req, res) =>
    res.send("nice api hit. Go green VapeNation")
  );
};
