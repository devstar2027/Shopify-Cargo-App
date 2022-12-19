import {Card, Grid, TextStyle, FormLayout, TextField, Button, EmptyState} from '@shopify/polaris';
import React from 'react';
import { useState, useCallback } from "react";
import { useForm, useField, notEmptyString } from "@shopify/react-form";

export default function Settings() {
  // const [expressShipments, setExpressShipments] = useState('');
  // const [carbox, setCargobox] = useState('');
  // const [companyName, setCompanyName] = useState('');
  // const [originCity, setOriginCity] = useState('');
  // const [originAddress, setOriginAddress] = useState('');

  const handleSubmit = async () => {
    console.log('submiting.');
    const body = {
      expressShipments,
      carbox,
      companyName,
      originCity,
      originAddress
    };
    const response = await fetch("/api/qrcodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    console.log(response);
    // if (response.ok) {
    // }
  };

  const onSubmit = useCallback(
    (body) => {
      (async () => {
        const parsedBody = body;
        const QRCodeId = 0;
        console.log(body);
        /* construct the appropriate URL to send the API request to based on whether the QR code is new or being updated */
        const url = QRCodeId ? `/api/qrcodes/${QRCodeId}` : "/api/qrcodes";
        /* a condition to select the appropriate HTTP method: PATCH to update a QR code or POST to create a new QR code */
        const method = QRCodeId ? "PATCH" : "POST";
        /* use (authenticated) fetch from App Bridge to send the request to the API and, if successful, clear the form to reset the ContextualSaveBar and parse the response JSON */
        const response = await fetch(url, {
          method,
          body: JSON.stringify(parsedBody),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          makeClean();
          const QRCode = await response.json();
          /* if this is a new QR code, then save the QR code and navigate to the edit page; this behavior is the standard when saving resources in the Shopify admin */
          if (!QRCodeId) {
            navigate(`/qrcodes/${QRCode.id}`);
            /* if this is a QR code update, update the QR code state in this component */
          } else {
            setQRCode(QRCode);
          }
        }
      })();
      return { status: "success" };
    },
    []
  );

  /*
    Sets up the form state with the useForm hook.

    Accepts a "fields" object that sets up each individual field with a default value and validation rules.

    Returns a "fields" object that is destructured to access each of the fields individually, so they can be used in other parts of the component.

    Returns helpers to manage form state, as well as component state that is based on form state.
  */
  const {
    fields: {
      expressShipments,
      carbox,
      companyName,
      originCity,
      originAddress,
    },
    dirty,
    reset,
    submitting,
    submit,
    makeClean,
  } = useForm({
    fields: {
      expressShipments: useField({
        value: "",
        validates: [notEmptyString("Please name your expressShipments")],
      }),
      carbox: useField({
        value: "",
        validates: [notEmptyString("Please name your carbox")],
      }),
      companyName: useField(""),
      originCity: useField(""),
      originAddress: useField(
        ""
      ),
    },
    onSubmit,
  });

  return (
    <Card
      title="Settings"
      primaryFooterAction={{content: 'Submit', onMouseEnter: submit, loading: submitting}}
    >
      <Card.Section>
        <TextStyle variation="strong">Please fill in the required information to complete your profile configuration.</TextStyle>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="ID number for Express shipments" {...expressShipments} autoComplete="off" />
            <TextField label="ID number for Cargobox(if exist)" {...carbox} autoComplete="off" />
          </FormLayout.Group>
          <FormLayout.Group condensed>
            <TextField label="Company name" {...companyName} autoComplete="off" />
            <TextField label="Origin City" {...originCity} autoComplete="off" />
            <TextField label="Origin Address" {...originAddress} autoComplete="off" />
          </FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </Card>
  );
}