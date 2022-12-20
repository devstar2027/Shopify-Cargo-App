import {Card, TextStyle, FormLayout, TextField, EmptyState} from '@shopify/polaris';
import React from 'react';
import { useState, useEffect } from "react";
import { useAppQuery } from "../hooks";

export default function Settings() {
  const [expressShipments, setExpressShipments] = useState('');
  const [cargobox, setCargobox] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [originAddress, setOriginAddress] = useState('');
  const [clientId, setClientId] = useState(0);

  const {data:clientInfo} = useAppQuery({
    url: "/api/client",
  });

  console.log(clientInfo);

	useEffect(async () => {
    if (clientInfo) {
      setClientId(clientInfo.id);
      setExpressShipments(clientInfo.expressShipments);
      setCargobox(clientInfo.cargobox);
      setCompanyName(clientInfo.companyName);
      setOriginCity(clientInfo.originCity);
      setOriginAddress(clientInfo.originAddress);
    }
  }, [clientInfo]);

  const onSubmit = async () => {
    const body = {
      expressShipments,
      cargobox,
      companyName,
      originCity,
      originAddress
    };
    console.log(body);
    const url = clientId ? `/api/client/${clientId}` : "/api/client";
    const method = clientId ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      setClientId(data.id);
    }
  }

  return (
    <Card
      title="Settings"
      primaryFooterAction={{content: 'Submit', onMouseEnter: onSubmit}}
    >
      <Card.Section>
        <TextStyle variation="strong">Please fill in the required information to complete your profile configuration.</TextStyle>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="ID number for Express shipments" value={expressShipments} onChange={(e) => setExpressShipments(e)} autoComplete="off" />
            <TextField label="ID number for Cargobox(if exist)" value={cargobox} onChange={(e) => setCargobox(e)} autoComplete="off" />
          </FormLayout.Group>
          <FormLayout.Group condensed>
            <TextField label="Company name" value={companyName} onChange={(e) => setCompanyName(e)} autoComplete="off" />
            <TextField label="Origin City" value={originCity} onChange={(e) => setOriginCity(e)} autoComplete="off" />
            <TextField label="Origin Address" value={originAddress} onChange={(e) => setOriginAddress(e)} autoComplete="off" />
          </FormLayout.Group>
          <EmptyState></EmptyState>
        </FormLayout>
      </Card.Section>
    </Card>
  );
}