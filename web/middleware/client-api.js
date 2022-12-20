import express from "express";
import { ClientDB } from "../client-db.js";
import {
  getClientOr404,
  getShopUrlFromSession,
  parseClientBody,
} from "../helpers/client-codes.js";

export default function applyClientApiEndpoints(app) {
  app.use(express.json());

  app.post("/api/client", async (req, res) => {
    try {
      console.log('id');
      const id = await ClientDB.create({
        ...(await parseClientBody(req)),
        /* Get the shop from the authorization header to prevent users from spoofing the data */
        shopDomain: await getShopUrlFromSession(req, res),
      });
      console.log(id);
      const response = await ClientDB.read(id);
      res.status(201).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.patch("/api/client/:id", async (req, res) => {
    const client = await getClientOr404(req, res);
    if (client) {
      try {
        await ClientDB.update(req.params.id, await parseClientBody(req));
        const response = await ClientDB.read(req.params.id);
        res.status(200).send(response);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  });

  app.get("/api/client", async (req, res) => {
    try {
      const rawCodeData = await ClientDB.list(
        await getShopUrlFromSession(req, res)
      );
      const response = rawCodeData[rawCodeData.length - 1];
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/client/:id", async (req, res) => {
    const client = await getClientOr404(req, res);
    if (client) {
      console.log(client);
      // const formattedQrCode = await formatQrCodeResponse(req, res, [client]);
      res.status(200).send(client[0]);
    }
  });

  app.delete("/api/client/:id", async (req, res) => {
    const client = await getClientOr404(req, res);
    if (client) {
      await ClientDB.delete(req.params.id);
      res.status(200).send();
    }
  });
}
