import {Card, Grid, TextStyle, FormLayout, TextField, Button, EmptyState} from '@shopify/polaris';
import React from 'react';
import { useState, useCallback } from "react";

export default function Settings() {
  const [expressShipments, setExpressShipments] = useState('');
  const [carbox, setCargobox] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [originAddress, setOriginAddress] = useState('');
  return (
        <Card
          title="Settings"
          primaryFooterAction={{content: 'Submit'}}
        >
          <Card.Section>
            <TextStyle variation="strong">Please fill in the required information to complete your profile configuration.</TextStyle>
            <FormLayout>
              <FormLayout.Group condensed>
                <TextField label="ID number for Express shipments" value={expressShipments} onChange={(e) => setExpressShipments(e)} autoComplete="off" />
                <TextField label="ID number for Cargobox(if exist)" value={carbox} onChange={(e) => setCargobox(e)} autoComplete="off" />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField label="Company name" value={companyName} onChange={(e) => setCompanyName(e)} autoComplete="off" />
                <TextField label="Origin City" value={originCity} onChange={(e) => setOriginCity(e)} autoComplete="off" />
                <TextField label="Origin Address" value={originAddress} onChange={(e) => setOriginAddress(e)} autoComplete="off" />
              </FormLayout.Group>
            </FormLayout>
          </Card.Section>
        </Card>
  );
}