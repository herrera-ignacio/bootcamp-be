import express from "express";

class DummyController {
  status: number;

  constructor(status = 200) {
    this.status = status;
  }

  getCallback() {
    return (
      req: express.Request, res: express.Response,
    ) => {
      res.sendStatus(this.status);
      return Promise.resolve();
    };
  }
}

export default DummyController;
