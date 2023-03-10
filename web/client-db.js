/*
  This file interacts with the app's database and is used by the app's REST APIs.
*/

import sqlite3 from "sqlite3";
import path from "path";
import shopify from "./shopify.js";

const DEFAULT_DB_FILE = path.join(process.cwd(), "client_db.sqlite");
const DEFAULT_PURCHASE_QUANTITY = 1;

export const ClientDB = {
  clientTableName: "client",
  db: null,
  ready: null,

  create: async function ({
    shopDomain,
    expressShipments,
    cargobox,
    companyName,
    originCity,
    originAddress,
  }) {
    await this.ready;

    const query = `
      INSERT INTO ${this.clientTableName}
      (shopDomain, expressShipments, cargobox, companyName, originCity, originAddress, scans)
      VALUES (?, ?, ?, ?, ?, ?, 0)
      RETURNING id;
    `;

    const rawResults = await this.__query(query, [
      shopDomain,
      expressShipments,
      cargobox,
      companyName,
      originCity,
      originAddress,
    ]);

    return rawResults[0].id;
  },

  update: async function (
    id,
    {
      expressShipments,
      cargobox,
      companyName,
      originCity,
      originAddress,
    }
  ) {
    await this.ready;

    const query = `
      UPDATE ${this.clientTableName}
      SET
        expressShipments = ?,
        cargobox = ?,
        companyName = ?,
        originCity = ?,
        originAddress = ?
      WHERE
        id = ?;
    `;

    await this.__query(query, [
      expressShipments,
      cargobox,
      companyName,
      originCity,
      originAddress,
      id,
    ]);
    return true;
  },

  list: async function (shopDomain) {
    await this.ready;
    const query = `
      SELECT * FROM ${this.clientTableName}
      WHERE shopDomain = ?;
    `;

    const results = await this.__query(query, [shopDomain]);

    return results.map((client) => this.__addImageUrl(client));
  },

  read: async function (id) {
    await this.ready;
    const query = `
      SELECT * FROM ${this.clientTableName}
      WHERE id = ?;
    `;
    const rows = await this.__query(query, [id]);
    if (!Array.isArray(rows) || rows?.length !== 1) return undefined;

    return this.__addImageUrl(rows[0]);
  },

  delete: async function (id) {
    await this.ready;
    const query = `
      DELETE FROM ${this.clientTableName}
      WHERE id = ?;
    `;
    await this.__query(query, [id]);
    return true;
  },

  /* The destination URL for a QR code is generated at query time */
  generateQrcodeDestinationUrl: function (client) {
    return `${shopify.api.config.hostScheme}://${shopify.api.config.hostName}/clients/${client.id}/scan`;
  },

  /* The behavior when a QR code is scanned */
  handleCodeScan: async function (client) {
    /* Log the scan in the database */
    await this.__increaseScanCount(client);

    const url = new URL(client.shopDomain);
    switch (client.destination) {
      /* The QR code redirects to the product view */
      case "product":
        return this.__goToProductView(url, client);

      /* The QR code redirects to checkout */
      case "checkout":
        return this.__goToProductCheckout(url, client);

      default:
        throw `Unrecognized destination "${client.destination}"`;
    }
  },

  /* Private */

  /*
    Used to check whether to create the database.
    Also used to make sure the database and table are set up before the server starts.
  */

  __hasQrCodesTable: async function () {
    const query = `
      SELECT name FROM sqlite_schema
      WHERE
        type = 'table' AND
        name = ?;
    `;
    const rows = await this.__query(query, [this.clientTableName]);
    return rows.length === 1;
  },

  /* Initializes the connection with the app's sqlite3 database */
  init: async function () {
    /* Initializes the connection to the database */
    this.db = this.db ?? new sqlite3.Database(DEFAULT_DB_FILE);

    const hasQrCodesTable = await this.__hasQrCodesTable();

    if (hasQrCodesTable) {
      this.ready = Promise.resolve();

      /* Create the QR code table if it hasn't been created */
    } else {
      const query = `
        CREATE TABLE ${this.clientTableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          shopDomain VARCHAR(511) NOT NULL,
          expressShipments VARCHAR(511) NOT NULL,
          cargobox VARCHAR(255) NOT NULL,
          companyName VARCHAR(255) NOT NULL,
          originCity VARCHAR(255) NOT NULL,
          originAddress VARCHAR(255) NOT NULL,
          scans INTEGER,
          createdAt DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
        )
      `;

      /* Tell the various CRUD methods that they can execute */
      this.ready = this.__query(query);
    }
  },

  /* Perform a query on the database. Used by the various CRUD methods. */
  __query: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },

  __addImageUrl: function (client) {
    try {
      client.imageUrl = this.__generateQrcodeImageUrl(client);
    } catch (err) {
      console.error(err);
    }

    return client;
  },

  __generateQrcodeImageUrl: function (client) {
    return `${shopify.api.config.hostScheme}://${shopify.api.config.hostName}/clients/${client.id}/image`;
  },

  __increaseScanCount: async function (client) {
    const query = `
      UPDATE ${this.clientTableName}
      SET scans = scans + 1
      WHERE id = ?
    `;
    await this.__query(query, [client.id]);
  },

  __goToProductView: function (url, client) {
    return productViewURL({
      discountCode: client.discountCode,
      host: url.toString(),
      productHandle: client.handle,
    });
  },

  __goToProductCheckout: function (url, client) {
    return productCheckoutURL({
      discountCode: client.discountCode,
      host: url.toString(),
      variantId: client.variantId,
      quantity: DEFAULT_PURCHASE_QUANTITY,
    });
  },
};

/* Generate the URL to a product page */
function productViewURL({ host, productHandle, discountCode }) {
  const url = new URL(host);
  const productPath = `/products/${productHandle}`;

  /* If this QR Code has a discount code, then add it to the URL */
  if (discountCode) {
    url.pathname = `/discount/${discountCode}`;
    url.searchParams.append("redirect", productPath);
  } else {
    url.pathname = productPath;
  }

  return url.toString();
}

/* Generate the URL to checkout with the product in the cart */
function productCheckoutURL({ host, variantId, quantity = 1, discountCode }) {
  const url = new URL(host);
  const id = variantId.replace(
    /gid:\/\/shopify\/ProductVariant\/([0-9]+)/,
    "$1"
  );

  /* The cart URL resolves to a checkout URL */
  url.pathname = `/cart/${id}:${quantity}`;

  if (discountCode) {
    url.searchParams.append("discount", discountCode);
  }

  return url.toString();
}
