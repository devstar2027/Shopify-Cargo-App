import {Card, List, TextStyle, FormLayout, TextField, Button} from '@shopify/polaris';
import React from 'react';

export default function Settings() {
  return (
    <Card
      title="Settings"
      primaryFooterAction={{content: 'Submit'}}
    >
      <Card.Section>
        <TextStyle variation="strong">Please fill in the required information to complete your profile configuration.</TextStyle>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="ID number for Express shipments" onChange={() => {}} autoComplete="off" />
            <TextField label="ID number for Cargobox(if exist)" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>
          <FormLayout.Group condensed>
            <TextField label="Company name" onChange={() => {}} autoComplete="off" />
            <TextField label="Origin City" onChange={() => {}} autoComplete="off" />
            <TextField label="Origin Address" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>
          <Button submit>Submit</Button>
        </FormLayout>
      </Card.Section>
    </Card>
  );
}