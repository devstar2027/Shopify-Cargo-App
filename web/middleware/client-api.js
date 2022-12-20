import express from "express";
import shopify from "../shopify.js";
import { ClientDB } from "../client-db.js";
import {
  getClientOr404,
  getShopUrlFromSession,
  parseClientBody,
} from "../helpers/client-codes.js";

const DISCOUNTS_QUERY = `
  query discounts($first: Int!) {
    codeDiscountNodes(first: $first) {
      edges {
        node {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              codes(first: 1) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
            ... on DiscountCodeBxgy {
              codes(first: 1) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
            ... on DiscountCodeFreeShipping {
              codes(first: 1) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

let session={"shop": "testdevloper.myshopify.com" , "accessToken": "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", isActive: ()=>{return true}}

export default function applyClientApiEndpoints(app) {
  app.use(express.json());

  app.get("/api/ordersList", async (req, res) => {
    const client = new shopify.api.clients.Graphql({
      session: session,
    });

    console.log(session);

    // /* Fetch all available discounts to list in the QR code form */
    const discounts = await client.query({
      data: {
        query: DISCOUNTS_QUERY,
        variables: {
          first: 25,
        },
      },
    });

    console.log(discounts);

    res.send(discounts.body.data);
  });

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
