import {Card, TextStyle, Heading, List} from '@shopify/polaris';
import React from 'react';

export default function Instructions() {
  return (
    <Card
      title="Instructions"
      style={{textAlign: "center"}}
    >
      <Card.Section>

        <Heading>How to create shipments?</Heading>
        
        <List type="number">
          <List.Item>View an order on your Shopify dashboard</List.Item>
          <List.Item>Click on "More Actions" in the top right corner</List.Item>
          <List.Item>Click "Send to Cargo"</List.Item>
        </List>
            
        <Heading>How to submit bulk shipment?</Heading>

        <List type="number">
          <List.Item>View your order list on your Shopify dashboard</List.Item>
          <List.Item>Click on the bulk selection symbol on the top of your list</List.Item>
          <List.Item>Click on "More Actions" in the top right corner</List.Item>
          <List.Item>Click "Send to Cargo"</List.Item>
        </List>

      </Card.Section>
    </Card>
  );
}